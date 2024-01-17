const db = require("../db/database");
const { DataTypes } = require("sequelize");

const User = db.define("tuser", {
    idUser: {
        type: DataTypes.CHAR(24),
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sobreMi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    frase: {
        type: DataTypes.STRING(80),
        allowNull: false,
    },
    cv: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        defaultValue: null,
    },
    telefono: {
        type: DataTypes.STRING(11),
        defaultValue: null,
    },
    website: {
        type: DataTypes.STRING(255),
        defaultValue: 'https://jheysonjhairpro.ccontrolz.com/',
    },
    direccion: {
        type: DataTypes.STRING(150),
        defaultValue: null,
    },
    cargo: {
        type: DataTypes.STRING(50),
        defaultValue: null,
    },
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = User;
