const db = require("../models/db");

const fs = require("fs");
const path = require("path");
const os = require("os");

exports.downloadCV = (req, res) => {
  const userId = req.params.userId;

  const query = "SELECT cv FROM tuser WHERE idUser = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener CV: " + err.message);
      res.status(500).json({ error: "Error al obtener CV" });
    } else {
      const cvData = results[0].cv;

      const tempDir = path.join(os.tmpdir(), "cv_temp");

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }

      const tempFilePath = path.join(tempDir, "CV.pdf");

      try {
        fs.writeFileSync(tempFilePath, cvData);
        res.download(tempFilePath, "CV.pdf", (err) => {
          fs.unlinkSync(tempFilePath);
          if (err) {
            console.error("Error al descargar CV: " + err.message);
          }
        });
      } catch (error) {
        console.error("Error al escribir el archivo temporal:", error);
        res
          .status(500)
          .json({ error: "Error al escribir el archivo temporal" });
      }
    }
  });
};

exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM tuser";

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
    "SELECT tinterests.nombre , tinterests.icono FROM tuser INNER JOIN tinterests ON tuser.idUser = tinterests.idUser";

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
    "SELECT taptitudes.nombre , taptitudes.porcentaje , taptitudes.tipo  FROM tuser INNER JOIN taptitudes ON tuser.idUser = taptitudes.idUser ORDER BY taptitudes.tipo;";

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
    "SELECT tbriefcase.proyecto , tbriefcase.descripcion , tbriefcase.web , tbriefcase.gitHub, tbriefcase.iconos , tbriefcase.image , tbriefcase.tipo  , tbriefcase.texto  FROM tuser INNER JOIN tbriefcase ON tuser.idUser = tbriefcase.idUser ORDER BY tbriefcase.tipo;";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las portafolio:", err.message);
      res.status(500).json({ error: "Error al obtener portafolio" });
    } else {
      res.json(results);
    }
  });
};
