const { DanfeProduct, Product } = require('../database/models');


const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductsByNf = async (invoiceNumber) => {
  try {
    const products = await DanfeProduct.findAll({
      where: {
        danfe_id: invoiceNumber,
      },
      include: [
        {
          model: Product,
          attributes: ['code', 'description', 'type'],
        },
      ],
      attributes: ['quantity'],
    });

    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getProductsByNf,
  getAllProducts
};
