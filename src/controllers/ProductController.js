const ProductService = require('../services/ProductService');


const getAllProducts = async (_req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'erro ao buscar produtos' });
  }
};

const getProductsByNf =  async (req, res) => {
  try {
    const { nf } = req.params;
    const products = await ProductService.getProductsByNf(nf);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: 'erro ao buscar produtos' });
  }
};

module.exports = {
  getProductsByNf,
  getAllProducts
};
