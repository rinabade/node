const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db-config');

const User = sequelize.define('user_details', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        primaryKey: false
    }
)

User.removeAttribute('id');


module.exports = User;