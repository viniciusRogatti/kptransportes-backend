const { Danfe, Customer, Product, DanfeProduct } = require('../database/models'); // Importe os modelos apropriados
const { Op } = require('sequelize');
const { format, subDays } = require('date-fns');
const {  parseFromTimeZone } = require('date-fns-timezone');

async function getTodayDanfes() {
  const yesterday = format(subDays(new Date(Date.now() - 86400000), 1), 'dd-MM-yyyy');
  const format = "DD-MM-YYYY";
  // const yesterdayFormat = formatToTimeZone(yesterday, format, { timeZone: "America/Sao_Paulo"});
  const yesterdayFormat = parseFromTimeZone(yesterday, format, { timeZone: "America/Sao_Paulo" });
  
  console.log(yesterdayFormat);

  try {
    const danfes = await Danfe.findAll({
      where: {
        invoice_date: yesterday,
      },
      include: [
        {
          model: Customer,
          attributes: ['name_or_legal_entity', 'phone', 'address', 'city', 'cnpj_or_cpf'],
        },
        {
          model: DanfeProduct,
          as: 'DanfeProducts',
          attributes: ['quantity', 'price', 'total_price', 'type'],
          include: {
            model: Product,
            attributes: ['code', 'description', 'price', 'type'],
          },
        },
      ],
    });

    return danfes;
  } catch (error) {
    throw error;
  }
}


const getDanfeByNf = async (nf) => {
  try {
    const danfe = await Danfe.findOne({
      where: {
        invoice_number: nf,
      },
      include: [
        {
          model: Customer,
          attributes: ['name_or_legal_entity', 'phone', 'address', 'city', 'cnpj_or_cpf'],
        },
        {
          model: DanfeProduct,
          as: 'DanfeProducts',
          attributes: ['quantity', 'price', 'total_price', 'type'],
          include: {
            model: Product,
            attributes: ['code', 'description', 'price', 'type'],
          },
        },
      ],
    });

    return danfe;
  } catch (error) {
    throw error;
  }
};

const getDanfeByBarcode = async (barcode) => {
  try {
    const danfe = await Danfe.findOne({
      where: {
        barcode,
      },
      include: [
        {
          model: Customer,
          attributes: ['name_or_legal_entity', 'phone', 'address', 'city', 'cnpj_or_cpf'],
        },
        {
          model: DanfeProduct,
          as: 'DanfeProducts',
          attributes: ['quantity', 'price', 'total_price', 'type'],
          include: {
            model: Product,
            attributes: ['code', 'description', 'price', 'type'],
          },
        },
      ],
    });

    return danfe;
  } catch (error) {
    throw error;
  }
};

const getDanfesByDate = async (startDate, endDate) => {
  try {
    const danfes = await Danfe.findAll({
      where: {
        invoice_date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: Customer,
          attributes: ['name_or_legal_entity', 'phone', 'address', 'city', 'cnpj_or_cpf'],
        },
        {
          model: DanfeProduct,
          as: 'DanfeProducts',
          attributes: ['quantity', 'price', 'total_price', 'type'],
          include: {
            model: Product,
            attributes: ['code', 'description', 'price', 'type'],
          },
        },
      ],
    });

    return danfes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTodayDanfes,
  getDanfeByNf,
  getDanfesByDate,
  getDanfeByBarcode
};
