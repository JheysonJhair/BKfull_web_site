const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Aptitudes = db.define("taptitudes", {
  idAptitudes: {
    type: DataTypes.CHAR(24),
    allowNull: false,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.CHAR(24),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  porcentaje: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});

const User = require('./User');
Aptitudes.belongsTo(User, { foreignKey: "idUser" });

module.exports = Aptitudes;
