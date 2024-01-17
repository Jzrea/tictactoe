const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT || 3306,
        dialect: "mysql",
        define: {
            freezeTableName: true
        },
        pool: {
            acquire: 30000,
            idle: 10000
        }
    }
);

function createSchema() {
    console.log("CREATING SCHEMA");
    const mysql = require("mysql2");
    const conn = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        multipleStatements: false,
    }).promise();
    conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB};`)
        .then((data) => {
            console.log(data);
            console.log(`${process.env.MYSQL_DB} Schema created.\nRestart App`);
        })
        .catch((err) => {
            console.error("MYSQL2 ERROR", err);
        });
}

module.exports = {
    sequelize,
    createSchema
};
