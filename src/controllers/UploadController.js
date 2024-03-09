const uploadService = require('../services/UploadService');

const UploadFiles = async (req, res) => {
  console.log('FILES =====>',req.body);
  try {
    await uploadService.processUpload(req.files);
    res.status(200).json({ message: 'Arquivos recebidos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar os arquivos.' });
  }
};

module.exports = { UploadFiles };
