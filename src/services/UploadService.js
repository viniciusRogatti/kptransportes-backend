const fs = require('fs');
const path = require('path');

const processUpload = async (files) => {
  try {
    // Caminho para o diretório "uploads"
    const uploadDirectory = path.join(__dirname, '..', '..', 'uploads');

    // Crie o diretório "uploads" se não existir
    if (!fs.existsSync(uploadDirectory)) {
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

  } catch (error) {
    console.error('Erro ao processar os arquivos:', error);
    return { success: false, message: 'Erro ao processar os arquivos.' };
  }
};

module.exports = { processUpload };
