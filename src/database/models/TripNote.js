module.exports = (sequelize, DataTypes) => {
  const TripNote = sequelize.define('TripNote', {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
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
    tableName: 'trip_notes',
    timestamps: false,
    underscored: true,
  });

  TripNote.associate = (models) => {
    TripNote.belongsTo(models.Trips, { foreignKey: 'trip_id' });
  };

  return TripNote;
};
