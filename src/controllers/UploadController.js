const uploadService = require('../services/UploadService');

async function uploadFiles(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo .xml enviado.' });
    }

    const results = await Promise.all(req.files.map(file => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const result = await uploadService.processXML(file.buffer);
          resolve(result);
        }, 100);
      });
    }));

    const successfulUploads = results.filter(result => result.success);
    const failedUploads = results.filter(result => !result.success);

    if (failedUploads.length > 0) {
      console.error('Falha ao processar alguns arquivos:', failedUploads);
    }

    return res.status(200).json({
      message: 'Arquivos processados!',
      successful: successfulUploads.length,
      failed: failedUploads.length,
      details: results,
    });
  } catch (error) {
    console.error('Erro ao processar arquivos:', error);
    return res.status(500).json({ error: 'Erro interno ao processar arquivos.' });
  }
}

module.exports = { uploadFiles };
