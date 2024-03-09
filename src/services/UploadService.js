const fs = require('fs');
const path = require('path');

const processUpload = async (files) => {
  try {
    // Caminho para o diretório "uploads"
    const uploadDirectory = path.join(__dirname, '..', 'uploads');

    console.log('pasta -=----->',uploadDirectory);

    // Crie o diretório "uploads" se não existir
    if (!fs.existsSync(uploadDirectory)) {
      console.log('entrou no if?????');
      fs.mkdirSync(uploadDirectory);
    }

    // Salve os arquivos no diretório "uploads"
    files.forEach((file) => {
      if (file && file.name) {
        const filePath = path.join(uploadDirectory, file.name);
        file.mv(filePath);
      }
    });

    // Imprima uma mensagem ou retorne uma resposta ao frontend, se necessário
    console.log('Arquivos salvos em', uploadDirectory);

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
