const uploadService = require('../services/UploadService');

async function uploadFiles(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo .xml enviado.' });
    }

    let successful = 0;
    let failed = 0;
    const details = [];

    for (const file of req.files) {
      const result = await uploadService.processXML(file.buffer);
      if (result.success) {
        successful++;
      } else {
        failed++;
      }
      details.push(...result.logMessages.map(message => ({ success: result.success, message })));
    }

    return res.status(200).json({
      message: 'Arquivos processados.',
      successful,
      failed,
      details
    });
  } catch (error) {
    console.error('Erro ao processar arquivos:', error);
    return res.status(500).json({ error: 'Erro interno ao processar arquivos.' });
  }
}

module.exports = { uploadFiles };
