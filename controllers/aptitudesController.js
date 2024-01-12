const db = require("../models/db");

// Crear Aptitudes
exports.createAptitudes = (req, res) => {
  try {
    const { idAptitudes, idUser, nombre, porcentaje, tipo } = req.body;
    const query = "INSERT INTO taptitudes (idAptitudes, idUser, nombre, porcentaje, tipo) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [idAptitudes, idUser, nombre, porcentaje, tipo], (err, result) => {
      if (err) {
        console.error("Error al registrar Aptitud: " + err.message);
        res.status(500).json({ error: "Error al registrar Aptitud" });
      } else {
        res.json({ message: "Aptitud registrado exitosamente", idAptitudes: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error en la creación de Aptitud:", error);
    res.status(500).json({ error: "Error en la creación de Aptitud" });
  }
};

// Actualizar Aptitudes por ID
exports.updateAptitudesById = (req, res) => {
  try {
    const idAptitudes = req.params.idAptitudes;
    const { idUser, nombre, porcentaje, tipo } = req.body;
    const query = "UPDATE taptitudes SET  idUser=?, nombre=?, porcentaje=?, tipo=?  WHERE idAptitudes = ?";

    db.query(query, [idUser, nombre, porcentaje, tipo, idAptitudes], (err, result) => {
      if (err) {
        console.error("Error al actualizar Aptitud: " + err.message);
        res.status(500).json({ error: "Error al actualizar Aptitud" });
      } else {
        res.json({ message: "Aptitud actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar Aptitud:", error);
    res.status(500).json({ error: "Error al actualizar Aptitud" });
  }
};

// Eliminar Aptitudes por ID
exports.deleteAptitudesById = (req, res) => {
  try {
    const idAptitudes = req.params.idAptitudes;
    const query = "DELETE FROM taptitudes WHERE idAptitudes = ?";

    db.query(query, [idAptitudes], (err, result) => {
      if (err) {
        console.error("Error al eliminar Aptitud: " + err.message);
        res.status(500).json({ error: "Error al eliminar Aptitud" });
      } else {
        res.json({ message: "Aptitud eliminado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar Aptitud:", error);
    res.status(500).json({ error: "Error al eliminar Aptitud" });
  }
};
