module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name_or_legal_entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cnpj_or_cpf: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  },{
    tableName: 'customers',
    timestamps: false,
    underscored: true,
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Danfe, { foreignKey: 'customer_id' });
  };

  return Customer;
}