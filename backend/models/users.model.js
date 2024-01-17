const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config.js");

const TABLE_NAME = "user";

const User = sequelize.define(TABLE_NAME, {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [5, 224],
                msg: "username too short"
            },
            is: {
                args: ["^[a-zA-Z0-9_.]+$", 'i'],
                msg: "illegal character found."
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            const bcrypt = require("bcryptjs");
            const salt = bcrypt.genSaltSync(16);
            const hash = bcrypt.hashSync(val, salt);
            this.setDataValue('password', hash);
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
            isEmail: true
        }
    }
}, {
    paranoid: true,
    validate: {
        usernamePassMatched() {
            if (this.username === this.password) {
                throw new Error("Username and Password should not match.");
            }
        }
    }
});

// Define the authenticate method
User.authenticate = async function (username, password) {
    const bcrypt = require("bcryptjs");
    const user = await this.findOne({ where: { username } });

    if (user && bcrypt.compareSync(password, user.password)) {
        return true; // Authentication successful
    }

    return false; // Authentication failed 
};

module.exports = {
    User,
    tableName: TABLE_NAME
};