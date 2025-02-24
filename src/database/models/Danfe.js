module.exports = (sequelize, DataTypes) => {
  const Danfe = sequelize.define('Danfe', {
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'cnpj_or_cpf',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    invoice_number: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'assigned', 'returned', 'redelivery', 'cancelled', 'delivered', 'on_the_way'),
      allowNull: false,
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    invoice_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gross_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    net_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: 'danfes',
    timestamps: false,
    underscored: true,
  });

  Danfe.associate = (models) => {
    Danfe.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    Danfe.hasMany(models.DanfeProduct, {
      foreignKey: 'danfe_id',
      as: 'DanfeProducts',
    });
  };


  return Danfe;
};