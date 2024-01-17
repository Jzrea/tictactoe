const { sequelize } = require("./config.js");

const db = {};
db.sequelize = sequelize;
db.Models = {};
db.Models.User = require("../models/users.model.js").User;


db.sequelize.sync({ alter: true });

function getDB() {
    return db;
}

const store = getDB();

module.exports = store;