const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const processUpload = async (files) => {
  try {
    // Caminho para o diretório "uploads"
    const uploadDirectory = path.join(__dirname, '..', '..', 'uploads');

    // Crie o diretório "uploads" se não existir
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    // Contador para verificar se todos os arquivos foram movidos
    let filesMovedCount = 0;

    // Salve os arquivos no diretório "uploads"
    files.forEach((file) => {
      if (file && file.name) {
        const filePath = path.join(uploadDirectory, file.name);
        file.mv(filePath, (err) => {
          if (err) {
            console.error(`Erro ao mover o arquivo ${file.name}: ${err}`);
          } else {
            console.log(`Arquivo ${file.name} movido com sucesso para ${uploadDirectory}`);
            filesMovedCount++;

            // Verifica se todos os arquivos foram movidos antes de executar xmlProcessor.js
            if (filesMovedCount === files.length) {
              executeXmlProcessor();
            }
          }
        });
      }
    });

    const executeXmlProcessor = () => {
      // Imprima uma mensagem ou retorne uma resposta ao frontend, se necessário
      console.log('Arquivos salvos em', uploadDirectory);

      // Execute o comando "node xmlProcessor.js" aqui
      exec('node xmlProcessor.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar xmlProcessor.js: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Erro ao executar xmlProcessor.js: ${stderr}`);
          return;
        }
        console.log(`xmlProcessor.js executado com sucesso: ${stdout}`);
      });
    };

    return { success: true, message: 'Arquivos processados com sucesso!' };
  } catch (error) {
    console.error('Erro ao processar os arquivos:', error);
    return { success: false, message: 'Erro ao processar os arquivos.' };
  }
};

module.exports = { processUpload };
