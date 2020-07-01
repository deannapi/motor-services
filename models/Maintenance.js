const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create the Maintenance Model
class Maintenance extends Model {}

Maintenance.init(
  {
    // Expects id, date, mileage, user_id, maintenance type
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    }, // removed user_id
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "maintenance",
  }
);

module.exports = Maintenance;
