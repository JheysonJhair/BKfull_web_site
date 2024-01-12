const db = require("../models/db");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Crear usuario
exports.createUser = (req, res) => {
  try {
    const { idUser, username, sobreMi, frase, cv, email, telefono, website, direccion, cargo } = req.body;
    const query = "INSERT INTO tuser (idUser, username, sobreMi, frase, cv, email, telefono, website, direccion, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [idUser, username, sobreMi, frase, cv, email, telefono, website, direccion, cargo], (err, result) => {
      if (err) {
        console.error("Error al registrar usuario: " + err.message);
        res.status(500).json({ error: "Error al registrar usuario" });
      } else {
        res.json({ message: "Usuario registrado exitosamente", idUser: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error en la creación de usuario:", error);
    res.status(500).json({ error: "Error en la creación de usuario" });
  }
};

// Actualizar usuario por ID
exports.updateUserById = (req, res) => {
  try {
    const idUser = req.params.idUser;
    const { username, sobreMi, frase, cv, email, telefono, website, direccion, cargo } = req.body;
    const query = "UPDATE tuser SET  username =? , sobreMi=? , frase=? , cv=? , email=? , telefono=? , website=? , direccion=? , cargo=?  WHERE idUser = ?";

    db.query(query, [username, sobreMi, frase, cv, email, telefono, website, direccion, cargo, idUser], (err, result) => {
      if (err) {
        console.error("Error al actualizar usuario: " + err.message);
        res.status(500).json({ error: "Error al actualizar usuario" });
      } else {
        res.json({ message: "Usuario actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar usuario por ID
exports.deleteUserById = (req, res) => {
  try {
    const idUser = req.params.idUser;
    const query = "DELETE FROM tuser WHERE idUser = ?";

    db.query(query, [idUser], (err, result) => {
      if (err) {
        console.error("Error al eliminar usuario: " + err.message);
        res.status(500).json({ error: "Error al eliminar usuario" });
      } else {
        res.json({ message: "Usuario eliminado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// Actualizar CV por ID
exports.updateCVById = (req, res) => {
  try {
    const idUser = req.params.idUser;
    const cvFile = req.file; // Obtén el archivo desde req.file
    const query = "UPDATE tuser SET cv = ? WHERE idUser = ?";

    db.query(query, [cvFile.buffer, idUser], (err, result) => {
      if (err) {
        console.error("Error al actualizar CV: " + err.message);
        res.status(500).json({ error: "Error al actualizar CV" });
      } else {
        res.json({ message: "CV actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar CV:", error);
    res.status(500).json({ error: "Error al actualizar CV" });
  }
};

// Descargar CV
exports.downloadCV = (req, res) => {
  try {
    const idUser = req.params.idUser;
    const query = "SELECT cv FROM tuser WHERE idUser = ?";

    db.query(query, [idUser], (err, results) => {
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
          res.status(500).json({ error: "Error al escribir el archivo temporal" });
        }
      }
    });
  } catch (error) {
    console.error("Error al descargar CV:", error);
    res.status(500).json({ error: "Error al descargar CV" });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  try {
    const query = "SELECT * FROM tuser";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener usuarios: " + err.message);
        res.status(500).json({ error: "Error al obtener usuarios" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ error: "Error al obtener todos los usuarios" });
  }
};

// Obtener todos los intereses
exports.getAllInterests = (req, res) => {
  try {
    const query = "SELECT tinterests.nombre , tinterests.icono FROM tuser INNER JOIN tinterests ON tuser.idUser = tinterests.idUser";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener intereses:", err.message);
        res.status(500).json({ error: "Error al obtener intereses" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener todos los intereses:", error);
    res.status(500).json({ error: "Error al obtener todos los intereses" });
  }
};

// Obtener todas las aptitudes
exports.getAllAptitudes = (req, res) => {
  try {
    const query = "SELECT taptitudes.nombre , taptitudes.porcentaje , taptitudes.tipo  FROM tuser INNER JOIN taptitudes ON tuser.idUser = taptitudes.idUser ORDER BY taptitudes.tipo;";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener las aptitudes:", err.message);
        res.status(500).json({ error: "Error al obtener aptitudes" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener todas las aptitudes:", error);
    res.status(500).json({ error: "Error al obtener todas las aptitudes" });
  }
};

// Obtener todos los proyectos del portafolio
exports.getAllBriefcase = (req, res) => {
  try {
    const query = "SELECT tbriefcase.proyecto , tbriefcase.descripcion , tbriefcase.web , tbriefcase.gitHub, tbriefcase.iconos , tbriefcase.image , tbriefcase.tipo  , tbriefcase.texto  FROM tuser INNER JOIN tbriefcase ON tuser.idUser = tbriefcase.idUser ORDER BY tbriefcase.tipo;";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al obtener los proyectos del portafolio:", err.message);
        res.status(500).json({ error: "Error al obtener proyectos del portafolio" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener todos los proyectos del portafolio:", error);
    res.status(500).json({ error: "Error al obtener todos los proyectos del portafolio" });
  }
};
