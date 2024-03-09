module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
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
    tableName: 'products',
    timestamps: false,
    underscored: true,
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Danfe, {
      through: models.DanfeProduct,
      foreignKey: 'product_id',
    });
  }
  

  return Product;
};
