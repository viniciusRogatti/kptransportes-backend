const uploadService = require('../services/UploadService');

async function uploadFiles(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Nenhum arquivo .xml enviado.' });
    }

    let successful = 0;
    let failed = 0;
    const allDetails = [];

    for (const file of req.files) {
      const result = await uploadService.processXML(file.buffer);
      if (result.success) {
        successful++;
      } else {
        failed++;
      }
      allDetails.push(...result.logMessages);
    }

    const detailsCount = allDetails.reduce((acc, message) => {
      acc[message] = (acc[message] || 0) + 1;
      return acc;
    }, {});

    const details = Object.entries(detailsCount).map(([message, count]) => ({
      success: true,
      message: `${count} ${message}`
    }));

    const successMessageIndex = details.findIndex(detail => detail.message.includes('XMLs processadas com sucesso!'));
    if (successMessageIndex !== -1) {
      const [successMessage] = details.splice(successMessageIndex, 1);
      details.unshift(successMessage);
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
