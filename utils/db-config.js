const Sequelize = require("sequelize");
require("dotenv").config();

// const connectDB = async() => {
    const sequelize = new Sequelize(
        process.env.PG_DB,
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        {
            host: process.env.PG_HOST,
            dialect: 'postgres',
            port: process.env.PG_PORT
        }
    )

    try {
        sequelize.authenticate();
        console.log("Connection has been established successfully.".bgGreen.black);
    } 
    catch (error) {
        console.error("Unable to connect to the database:".bgRed.black, error);
    }

// }

module.exports = sequelize;