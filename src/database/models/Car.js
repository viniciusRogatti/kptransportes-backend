module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license_plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'cars',
    timestamps: false,
    underscored: true,
  });

  Car.associate = (models) => {
    Car.hasMany(models.Trips, { foreignKey: 'car_id' });
  };

  return Car;
};
