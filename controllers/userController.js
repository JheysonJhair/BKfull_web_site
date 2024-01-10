const db = require("../models/db");

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM tUser";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios: " + err.message);
      res.status(500).json({ error: "Error al obtener usuarios" });
    } else {
      res.json(results);
    }
  });
};
exports.getAllInterests = (req, res) => {
  const query =
    "SELECT tInterests.nombre , tInterests.icono FROM tUser INNER JOIN tInterests ON tUser.idUser = tInterests.idUser";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener intereses:", err.message);
      res.status(500).json({ error: "Error al obtener intereses" });
    } else {
      res.json(results);
    }
  });
};
exports.getAllAptitudes = (req, res) => {
  const query =
    "SELECT tAptitudes.nombre , tAptitudes.porcentaje , tAptitudes.tipo  FROM tUser INNER JOIN tAptitudes ON tUser.idUser = tAptitudes.idUser ORDER BY tAptitudes.tipo;";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las aptitudes:", err.message);
      res.status(500).json({ error: "Error al obtener aptitudes" });
    } else {
      res.json(results);
    }
  });
};

exports.getAllBriefcase = (req, res) => {
  const query =
    "SELECT tBriefcase.proyecto , tBriefcase.descripcion , tBriefcase.web , tBriefcase.gitHub, tBriefcase.iconos , tBriefcase.image , tBriefcase.tipo  , tBriefcase.texto  FROM tUser INNER JOIN tBriefcase ON tUser.idUser = tBriefcase.idUser ORDER BY tBriefcase.tipo;";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las portafolio:", err.message);
      res.status(500).json({ error: "Error al obtener portafolio" });
    } else {
      res.json(results);
    }
  });
};
