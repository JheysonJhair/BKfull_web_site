const db = require("../models/db");

// Crear interes
exports.createInterests = (req, res) => {
  try {
    const { idInterests, idUser, nombre, icono } = req.body;
    const query = "INSERT INTO tinterests (idInterests, idUser, nombre, icono) VALUES (?, ?, ?, ?)";

    db.query(query, [idInterests, idUser, nombre, icono], (err, result) => {
      if (err) {
        console.error("Error al registrar interés: " + err.message);
        res.status(500).json({ error: "Error al registrar interés" });
      } else {
        res.json({ message: "Interés registrado exitosamente", idInterests: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error en la creación de interés:", error);
    res.status(500).json({ error: "Error en la creación de interés" });
  }
};

// Actualizar interés por ID
exports.updateInterestsById = (req, res) => {
  try {
    const idInterests = req.params.idInterests;
    const { idUser, nombre, icono } = req.body;
    const query = "UPDATE tinterests SET  idUser=?, nombre=?, icono=?  WHERE idInterests = ?";

    db.query(query, [idUser, nombre, icono, idInterests], (err, result) => {
      if (err) {
        console.error("Error al actualizar interés: " + err.message);
        res.status(500).json({ error: "Error al actualizar interés" });
      } else {
        res.json({ message: "Interés actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar interés:", error);
    res.status(500).json({ error: "Error al actualizar interés" });
  }
};

// Eliminar interés por ID
exports.deleteInterestsById = (req, res) => {
  try {
    const idInterests = req.params.idInterests;
    const query = "DELETE FROM tinterests WHERE idInterests = ?";

    db.query(query, [idInterests], (err, result) => {
      if (err) {
        console.error("Error al eliminar interés: " + err.message);
        res.status(500).json({ error: "Error al eliminar interés" });
      } else {
        res.json({ message: "Interés eliminado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar interés:", error);
    res.status(500).json({ error: "Error al eliminar interés" });
  }
};
