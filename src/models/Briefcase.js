const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Briefcase = db.define("tbriefcase", {
    idBriefcase: {
        type: DataTypes.CHAR(24),
        allowNull: false,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.CHAR(24),
        allowNull: false,
    },
    proyecto: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    web: {
        type: DataTypes.STRING(255),
        allowNull: false,
        charset: 'utf8',
    },
    gitHub: {
        type: DataTypes.STRING(255),
        allowNull: false,
        charset: 'utf8',
    },
    iconos: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        charset: 'utf8',
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    texto: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

const User = require('./User')
Briefcase.belongsTo(User, { foreignKey: 'idUser' });

module.exports = Briefcase;






