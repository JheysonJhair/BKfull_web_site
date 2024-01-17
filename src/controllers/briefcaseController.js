const Briefcase = require('../models/Briefcase');

// Crear Briefcase
exports.createBriefcase = async (req, res) => {
  try {
    const {idBriefcase, idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto } = req.body;

    const briefcase = await Briefcase.create({
      idBriefcase,
      idUser,
      proyecto,
      descripcion,
      web,
      gitHub,
      iconos,
      image,
      tipo,
      texto,
    });

    res.json({ message: "Briefcase registrado exitosamente" });
  } catch (error) {
    console.error("Error en la creación de Briefcase:", error);
    res.status(500).json({ error: "Error en la creación de Briefcase" });
  }
};

exports.updateBriefcaseById = async (req, res) => {
  try {
    const idBriefcase = req.params.idBriefcase;
    const { idUser, proyecto, descripcion, web, gitHub, iconos, image, tipo, texto } = req.body;

    const result = await Briefcase.update(
      {
        idUser,
        proyecto,
        descripcion,
        web,
        gitHub,
        iconos,
        image,
        tipo,
        texto,
      },
      {
        where: { idBriefcase: idBriefcase },
      }
    );

    if (result[0] === 0) {
      return res.status(404).json({ msg: "Briefcase no encontrado" });
    }

    res.json({ message: "Briefcase actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar Briefcase:", error);
    res.status(500).json({ error: "Error al actualizar Briefcase", message: error.message });
  }
};


exports.deleteBriefcaseById = async (req, res) => {
  try {
    const idBriefcase = req.params.idBriefcase;

    const result = await Briefcase.destroy({
      where: { idBriefcase: idBriefcase },
    });

    if (!result) {
      return res.status(404).json({ msg: "Briefcase no encontrado" });
    }

    res.json({ message: "Briefcase eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar Briefcase:", error);
    res.status(500).json({ error: "Error al eliminar Briefcase", message: error.message });
  }
};
