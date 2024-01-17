const db = require("../db/database");
const { DataTypes } = require("sequelize");

const Interests = db.define("tinterests", {
  idInterests: {
    type: DataTypes.CHAR(24),
    allowNull: false,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.CHAR(24),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  icono: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

const User = require('./User')
Interests.belongsTo(User, { foreignKey: "idUser" });

module.exports = Interests;
