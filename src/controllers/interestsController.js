const Interest = require('../models/Interests'); 

exports.createInterests = async (req, res) => {
  try {
    const { idInterests, idUser, nombre, icono } = req.body;

    const interest = await Interest.create({
      idInterests,
      idUser,
      nombre,
      icono,
    });

    res.json({ message: "Interés registrado exitosamente"});
  } catch (error) {
    console.error("Error en la creación de interés:", error);
    res.status(500).json({ error: "Error en la creación de interés" });
  }
};

exports.updateInterestsById = async (req, res) => {
  try {
    const idInterests = req.params.idInterests;
    const { idUser, nombre, icono } = req.body;

    const result = await Interest.update(
      {
        idUser,
        nombre,
        icono,
      },
      {
        where: { idInterests: idInterests },
      }
    );

    if (result[0] === 0) {
      return res.status(404).json({ msg: "Interés no encontrado" });
    }

    res.json({ message: "Interés actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar interés:", error);
    res.status(500).json({ error: "Error al actualizar interés", message: error.message });
  }
};

exports.deleteInterestsById = async (req, res) => {
  try {
    const idInterests = req.params.idInterests;

    const result = await Interest.destroy({
      where: { idInterests: idInterests },
    });

    if (!result) {
      return res.status(404).json({ msg: "Interés no encontrado" });
    }

    res.json({ message: "Interés eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar interés:", error);
    res.status(500).json({ error: "Error al eliminar interés", message: error.message });
  }
};
