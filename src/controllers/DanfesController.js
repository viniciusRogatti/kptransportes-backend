const DanfesService = require('../services/DanfesService');

const getTodayDanfes = async (req, res) => {
  try {
    const danfes = await DanfesService.getTodayDanfes();
    return res.json(danfes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar as notas fiscais do dia.' });
  }
};

const getDanfeByNf = async (req, res) => {
  try {
    const { id } = req.params;
    const danfes = await DanfesService.getDanfeByNf(id);
    return res.json(danfes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar a nota fiscal.' });
  }
};

const getDanfeByBarcode = async (req, res) => {
  try {
    const { id } = req.params;
    const danfes = await DanfesService.getDanfeByBarcode(id);
    return res.json(danfes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar a nota fiscal.' });
  }
};

const getDanfesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const danfes = await DanfesService.getDanfesByDate(startDate, endDate);
    return res.json(danfes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar notas fiscais por data.' });
  }
};

module.exports = {
  getTodayDanfes,
  getDanfeByNf,
  getDanfesByDate,
  getDanfeByBarcode,
};
