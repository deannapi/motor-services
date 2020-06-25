const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cost extends Model { }

Cost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // add other properties as needed
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Cost;