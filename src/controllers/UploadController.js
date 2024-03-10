const uploadService = require('../services/UploadService');

class UploadFiles {
  static async UploadFiles(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'Nenhum arquivo .xml enviado.' });
      }

      for (const file of req.files) {
        await uploadService.processXML(file.buffer);
      }

      return res.status(200).json({ message: 'Arquivos enviados com sucesso!' });
    } catch (error) {
      console.error('Erro ao processar arquivos:', error);
      return res.status(500).json({ error: 'Erro interno ao processar arquivos.' });
    }
  }
}

module.exports = { UploadFiles };
