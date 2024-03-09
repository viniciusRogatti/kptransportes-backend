// models/Trips.js
module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define('Trips', {
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gross_weight: {
      type: DataTypes.DECIMAL(10, 2),
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
    tableName: 'trips',
    timestamps: false,
    underscored: true,
  });

  Trips.associate = (models) => {
    Trips.belongsTo(models.Driver, { foreignKey: 'driver_id' });
    Trips.belongsTo(models.Car, { foreignKey: 'car_id' });
    Trips.hasMany(models.TripNote, { foreignKey: 'trip_id' });
  };

  return Trips;
};
