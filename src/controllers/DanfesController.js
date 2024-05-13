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

const updateDanfesStatus = async (req, res) => {
  try {
    const { danfes } = req.body;
    await DanfesService.updateDanfesStatus(danfes);
    res.status(200).json({ message: 'Status das danfes atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o status das danfes' });
  }
};

module.exports = {
  getTodayDanfes,
  getDanfeByNf,
  getDanfesByDate,
  getDanfeByBarcode,
  updateDanfesStatus,
};

