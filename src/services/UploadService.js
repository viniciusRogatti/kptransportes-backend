const fs = require('fs');
const path = require('path');
const xmlDirectory = '../../uploads';

const processUpload = async (files) => {
  try {
    // Caminho para o diretório "uploads"
    // const uploadDirectory = path.join(__dirname, '..', 'uploads');

    // Crie o diretório "uploads" se não existir
    if (!fs.existsSync(xmlDirectory)) {
      fs.mkdirSync(xmlDirectory);
    }

    // Salve os arquivos no diretório "uploads"
    files.forEach((file) => {
      const filePath = path.join(xmlDirectory, file.name);
      file.mv(filePath); // Método de movimentação pode variar
    });

    // Imprima uma mensagem ou retorne uma resposta ao frontend, se necessário
    console.log('Arquivos salvos em', xmlDirectory);

    // Execute o comando "node xmlProcessor.js" aqui
    const { exec } = require('child_process');
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

    return { success: true, message: 'Arquivos processados com sucesso!' };
  } catch (error) {
    console.error('Erro ao processar os arquivos:', error);
    return { success: false, message: 'Erro ao processar os arquivos.' };
  }
};

module.exports = { processUpload };
