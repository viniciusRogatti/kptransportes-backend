const { promisify } = require('util');
const xml2js = require('xml2js');
const { Danfe, Customer, Product, DanfeProduct } = require('../database/models'); 

const parseXML = promisify(xml2js.parseString);

const processXML = async (xmlBuffer) => {
  let transaction;
  const logMessages = [];  // Para armazenar mensagens de log detalhadas

  try {
    const xmlData = xmlBuffer.toString('utf-8');
    const parsedData = await parseXML(xmlData);

    const customerInfo = parsedData.nfeProc.NFe[0].infNFe[0].dest[0];
    const danfeInfo = parsedData.nfeProc.NFe[0].infNFe[0];
    const productsInfo = parsedData.nfeProc.NFe[0].infNFe[0].det;

    transaction = await Danfe.sequelize.transaction();

    const existingDanfe = await Danfe.findOne({ where: { invoice_number: danfeInfo.ide[0].nNF[0] }, transaction });

    if (existingDanfe) {
      logMessages.push(`A nota fiscal ${danfeInfo.ide[0].nNF[0]} já existe no banco de dados.`);
      await transaction.commit();
      return { success: true, message: `A nota fiscal ${danfeInfo.ide[0].nNF[0]} já existe no banco de dados.`, logMessages };
    }

    const departureTime = danfeInfo.ide[0].dhSaiEnt[0].split("T")[1].split(":")[0];

    if (departureTime >= 0 && departureTime < 12) {
      const dataEmissao = new Date(danfeInfo.ide[0].dhSaiEnt[0].split("T")[0]);
      dataEmissao.setDate(dataEmissao.getDate() - 1);
      danfeInfo.ide[0].dhSaiEnt[0] = dataEmissao.toISOString().split('T')[0] + 'T' + danfeInfo.ide[0].dhSaiEnt[0].split("T")[1];
    }

    let qVol = 0;

    if (danfeInfo.transp[0].vol[0] && danfeInfo.transp[0].vol[0].qVol !== undefined) {
      qVol = danfeInfo.transp[0].vol[0].qVol[0];
    }

    // Verificando se o cliente já existe no banco de dados
    const existingCustomer = await Customer.findOne({ where: { cnpj_or_cpf: customerInfo.CNPJ[0] }, transaction });
    let customer;

    if (existingCustomer) {
      customer = existingCustomer;
      logMessages.push(`O cliente ${customerInfo.CNPJ[0]} já existe no banco de dados.`);
    } else {
      // Cliente não existe, cria um novo
      customer = await Customer.create({
        name_or_legal_entity: customerInfo.xNome[0],
        phone: customerInfo.enderDest[0].fone[0],
        address: customerInfo.enderDest[0].xLgr[0],
        cnpj_or_cpf: customerInfo.CNPJ[0],
        city: customerInfo.enderDest[0].xMun[0],
        state: customerInfo.enderDest[0].UF[0],
        zip_code: customerInfo.enderDest[0].CEP[0],
        neighborhood: customerInfo.enderDest[0].xBairro[0],
      }, { transaction });
      logMessages.push(`Novo cliente ${customerInfo.CNPJ[0]} criado.`);
    }

    // Inserir informações da DANFE (Danfe) no banco de dados
    const createdDanfe = await Danfe.create({
      customer_id: customer.cnpj_or_cpf,
      invoice_number: danfeInfo.ide[0].nNF[0],
      barcode: danfeInfo["$"].Id.replace("NFe", ""),
      invoice_date: danfeInfo.ide[0].dhSaiEnt[0].split("T")[0],
      departure_time: danfeInfo.ide[0].dhSaiEnt[0].split("T")[1].split("-")[0],
      total_quantity: qVol,
      gross_weight: danfeInfo.transp[0].vol[0].pesoB[0],
      net_weight: danfeInfo.transp[0].vol[0].pesoL[0],
      total_value: danfeInfo.total[0].ICMSTot[0].vProd[0],
      status: 'pending',
    }, { transaction });

    // Processar produtos
    for (const productInfo of productsInfo) {
      const existingProduct = await Product.findOne({ where: { code: productInfo.prod[0].cProd[0] }, transaction });

      if (!existingProduct) {
        await Product.create({
          code: productInfo.prod[0].cProd[0],
          description: productInfo.prod[0].xProd[0],
          price: parseFloat(productInfo.prod[0].vUnCom[0].replace(',', '.')),
          type: productInfo.prod[0].uCom[0],
        }, { transaction });
        logMessages.push(`Novo produto ${productInfo.prod[0].cProd[0]} criado.`);
      } else {
        logMessages.push(`O produto ${productInfo.prod[0].cProd[0]} já existe no banco de dados. Ignorando a criação.`);
      }

      await DanfeProduct.create({
        danfe_id: createdDanfe.invoice_number,
        product_id: productInfo.prod[0].cProd[0],
        quantity: parseFloat(productInfo.prod[0].qCom[0].replace(',', '.')),
        price: parseFloat(productInfo.prod[0].vUnCom[0].replace(',', '.')),
        total_price: parseFloat(productInfo.prod[0].vProd[0].replace(',', '.')),
        type: productInfo.prod[0].uCom[0],
      }, { transaction });
    }

    logMessages.push('Informações do XML processadas com sucesso!');
    await transaction.commit();
    return { success: true, logMessages };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Erro ao processar o XML:', error);
    logMessages.push(`Erro ao processar o XML: ${error.message}`);
    return { success: false, logMessages };
  }
};

module.exports = { processXML };
