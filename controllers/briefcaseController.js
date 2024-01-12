const db = require("../models/db");

// Crear Briefcase
exports.createBriefcase = (req, res) => {
  try {
    const { idBriefcase, idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto } = req.body;
    const query = "INSERT INTO tbriefcase (idBriefcase, idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [idBriefcase, idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto], (err, result) => {
      if (err) {
        console.error("Error al registrar Briefcase: " + err.message);
        res.status(500).json({ error: "Error al registrar Briefcase" });
      } else {
        res.json({ message: "Briefcase registrado exitosamente", idBriefcase: result.insertId });
      }
    });
  } catch (error) {
    console.error("Error en la creación de Briefcase:", error);
    res.status(500).json({ error: "Error en la creación de Briefcase" });
  }
};

// Actualizar Briefcase por ID
exports.updateBriefcaseById = (req, res) => {
  try {
    const idBriefcase = req.params.idBriefcase;
    const { idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto } = req.body;
    const query = "UPDATE tbriefcase SET  idUser=?, proyecto=? , descripcion=? , web=? , gitHub=? , iconos=? , image=? , tipo=? , texto=?  WHERE idBriefcase = ?";

    db.query(query, [idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto, idBriefcase], (err, result) => {
      if (err) {
        console.error("Error al actualizar Briefcase: " + err.message);
        res.status(500).json({ error: "Error al actualizar Briefcase" });
      } else {
        res.json({ message: "Briefcase actualizado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al actualizar Briefcase:", error);
    res.status(500).json({ error: "Error al actualizar Briefcase" });
  }
};

// Eliminar Briefcase por ID
exports.deleteBriefcaseById = (req, res) => {
  try {
    const idBriefcase = req.params.idBriefcase;
    const query = "DELETE FROM tbriefcase WHERE idBriefcase = ?";

    db.query(query, [idBriefcase], (err, result) => {
      if (err) {
        console.error("Error al eliminar Briefcase: " + err.message);
        res.status(500).json({ error: "Error al eliminar Briefcase" });
      } else {
        res.json({ message: "Briefcase eliminado exitosamente" });
      }
    });
  } catch (error) {
    console.error("Error al eliminar Briefcase:", error);
    res.status(500).json({ error: "Error al eliminar Briefcase" });
  }
};
