module.exports = (sequelize, DataTypes) => {
  const DanfeProduct = sequelize.define('DanfeProduct', {
    danfe_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'danfes',
        key: 'invoice_number',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'code',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'products_danfe',
    timestamps: false,
    underscored: true,
  });

  DanfeProduct.associate = (models) => {
    DanfeProduct.belongsTo(models.Danfe, { 
        foreignKey: 'invoice_number',
        as: 'Danfe'
      });
    DanfeProduct.belongsTo(models.Product, { foreignKey: 'product_id' });
  };
  

  return DanfeProduct;
};
