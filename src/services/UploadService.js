const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const processUpload = async (files) => {
  try {
    const uploadDirectory = path.join(__dirname, '..', '..', 'uploads');
    const xmlProcessorPath = path.join(__dirname, '..', '..','xmlProcessor.js');
    console.log('começo do arquivo');

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    let filesMovedCount = 0;

    const moveFile = (file, filePath) => {
      return new Promise((resolve, reject) => {
        file.mv(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    };

    await Promise.all(files.map(async (file) => {
      if (file && file.name) {
        const filePath = path.join(uploadDirectory, file.name);
        await moveFile(file, filePath);
        console.log(`Arquivo ${file.name} movido com sucesso para ${uploadDirectory}`);
        filesMovedCount++;
      }
    }));

    console.log('antes da função do exec');

    
    function executeXmlProcessor() {
      console.log('comando node', xmlProcessorPath);
      console.log('Arquivos salvos em', uploadDirectory);

      exec(`node ${xmlProcessorPath}`, (error, stdout, stderr) => {
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
    }

    executeXmlProcessor();

    return { success: true, message: 'Arquivos processados com sucesso!' };
  } catch (error) {
    console.error('Erro ao processar os arquivos:', error);
    return { success: false, message: 'Erro ao processar os arquivos.' };
  }
};

module.exports = { processUpload };
