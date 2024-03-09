const fs = require('fs');
const { promisify } = require('util');
const xml2js = require('xml2js');

// Importe o pool de conexão do banco de dados
const { pool } = require('./src/database/config/config');

// Importação das models (customers, danfes, products, products_danfe)
const { Customer, Danfe, Product, DanfeProduct } = require('./src/database/models');

// Função para ler e processar o XML
const parseXML = promisify(xml2js.parseString);

// Função para processar o XML e ajustar a data da DANFE se necessário
async function processXML(xmlFilePath, callback) {
  try {
    // Leitura do arquivo XML
    const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

    // Parse do XML para objeto JavaScript
    const parsedData = await parseXML(xmlData);

    // Extração das informações do objeto parsedData
    const customerInfo = parsedData.nfeProc.NFe[0].infNFe[0].dest[0];
    const danfeInfo = parsedData.nfeProc.NFe[0].infNFe[0];
    const productsInfo = parsedData.nfeProc.NFe[0].infNFe[0].det;
    
  
    // Verificar se a NF já existe no banco de dados
    const existingDanfe = await Danfe.findOne({ where: { invoice_number: danfeInfo.ide[0].nNF[0] } });

    
    
    if (existingDanfe) {
      console.log(`A nota fiscal ${danfeInfo.ide[0].nNF[0]} já existe no banco de dados. Ignorando e deletando o XML.`);
      fs.unlinkSync(xmlFilePath);
    } else {
      // Verificar se o horário de saída está entre 00:00 e 12:00
      
      //  danfeInfo.ide[0].dhSaiEnt[0].split("T")[0],
      //  danfeInfo.ide[0].dhSaiEnt[0].split("T")[1].split("-")[0],
      const departureTime = danfeInfo.ide[0].dhSaiEnt[0].split("T")[1].split(":")[0];
      
      // Se a hora de saída estiver entre 00:00 e 12:00, retroceder a data em um dia
      if (departureTime >= 0 && departureTime < 12) {
        const dataEmissao = new Date(danfeInfo.ide[0].dhSaiEnt[0].split("T")[0]);
        dataEmissao.setDate(dataEmissao.getDate() - 1);
        danfeInfo.ide[0].dhSaiEnt[0] = dataEmissao.toISOString().split('T')[0] + 'T' + danfeInfo.ide[0].dhSaiEnt[0].split("T")[1];
      }
      
      let qVol = 0; // Defina um valor padrão, caso qVol não seja definido
      if (danfeInfo.transp[0].vol[0] && danfeInfo.transp[0].vol[0].qVol !== undefined) {
        qVol = danfeInfo.transp[0].vol[0].qVol[0];  
      }
      // Verificar se o cliente já existe no banco de dados
      const existingCustomer = await Customer.findOne({ where: { cnpj_or_cpf: customerInfo.CNPJ[0] } });

      if (!existingCustomer) {
        await pool.query(`
          INSERT INTO customers (name_or_legal_entity, phone, address, cnpj_or_cpf, city, state, zip_code, neighborhood)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          customerInfo.xNome[0],
          customerInfo.enderDest[0].fone[0],
          customerInfo.enderDest[0].xLgr[0],
          customerInfo.CNPJ[0],
          customerInfo.enderDest[0].xMun[0],
          customerInfo.enderDest[0].UF[0],
          customerInfo.enderDest[0].CEP[0],
          customerInfo.enderDest[0].xBairro[0],
        ]);
    
      }
      // Inserir informações da DANFE (Danfe) no banco de dados
      await pool.query(`
        INSERT INTO danfes (customer_id, invoice_number, barcode, invoice_date, departure_time, total_quantity, gross_weight, net_weight, total_value)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        customerInfo.CNPJ[0],
        danfeInfo.ide[0].nNF[0],
        danfeInfo["$"].Id.replace("NFe", ""),
        danfeInfo.ide[0].dhSaiEnt[0].split("T")[0],
        danfeInfo.ide[0].dhSaiEnt[0].split("T")[1].split("-")[0],
        qVol,
        danfeInfo.transp[0].vol[0].pesoB[0],
        danfeInfo.transp[0].vol[0].pesoL[0],
        danfeInfo.total[0].ICMSTot[0].vProd[0],
      ]);

      for (const productInfo of productsInfo) {
        let product;

        // Verificar se o produto já existe no banco de dados
        const existingProduct = await Product.findOne({ where: { code: productInfo.prod[0].cProd[0] } });

        if (!existingProduct) {
          // Criar um novo produto se não existir
          console.log(`Produto não existe no banco de dados. Criando novo produto.${productInfo.prod[0].cProd[0]}`);
          product = await pool.query(`
            INSERT INTO products (code, description, price, type)
            VALUES (?, ?, ?, ?)
          `, [
            productInfo.prod[0].cProd[0],
            productInfo.prod[0].xProd[0],
            parseFloat(productInfo.prod[0].vUnCom[0].replace(',', '.')),
            productInfo.prod[0].uCom[0],
          ]);
        }
        await pool.query(`
          INSERT INTO products_danfe (danfe_id, product_id, quantity, price, total_price, type)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          danfeInfo.ide[0].nNF[0],
          productInfo.prod[0].cProd[0],
          parseFloat(productInfo.prod[0].qCom[0].replace(',', '.')),
          parseFloat(productInfo.prod[0].vUnCom[0].replace(',', '.')),
          parseFloat(productInfo.prod[0].vProd[0].replace(',', '.')),
          productInfo.prod[0].uCom[0],
        ]);
      }

      console.log('Informações do XML processadas com sucesso!');
      fs.unlinkSync(xmlFilePath);
    }

    if (callback) callback();
  } catch (error) {
    console.error('Erro ao processar o XML:', error);
    if (callback) callback();
  }
}

module.exports = processXML;
