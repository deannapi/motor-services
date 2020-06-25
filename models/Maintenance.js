const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Maintenance Model
class Maintenance extends Model {}

Maintenance.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'maintenance'
}
);

module.exports = Maintenance;