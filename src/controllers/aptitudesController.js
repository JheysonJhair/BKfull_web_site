const Aptitude = require('../models/Aptitudes'); 

exports.createAptitudes = async (req, res) => {
  try {
    const { idAptitudes, idUser, nombre, porcentaje, tipo } = req.body;

    const aptitude = await Aptitude.create({
      idAptitudes,
      idUser,
      nombre,
      porcentaje,
      tipo,
    });

    res.json({ message: "Aptitud registrada exitosamente"});
  } catch (error) {
    console.error("Error en la creación de Aptitud:", error);
    res.status(500).json({ error: "Error en la creación de Aptitud" });
  }
};


exports.updateAptitudesById = async (req, res) => {
  try {
    const idAptitudes = req.params.idAptitudes;
    const { idUser, nombre, porcentaje, tipo } = req.body;

    const result = await Aptitude.update(
      {
        idUser,
        nombre,
        porcentaje,
        tipo,
      },
      {
        where: { idAptitudes: idAptitudes },
      }
    );

    if (result[0] === 0) {
      return res.status(404).json({ msg: "Aptitud no encontrada" });
    }

    res.json({ message: "Aptitud actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar Aptitud:", error);
    res.status(500).json({ error: "Error al actualizar Aptitud", message: error.message });
  }
};

exports.deleteAptitudesById = async (req, res) => {
  try {
    const idAptitudes = req.params.idAptitudes;

    const result = await Aptitude.destroy({
      where: { idAptitudes: idAptitudes },
    });
    
    if (!result) {
      return res.status(404).json({ msg: "Aptitud no encontrada" });
    }

    res.json({ message: "Aptitud eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar Aptitud:", error);
    res.status(500).json({ error: "Error al eliminar Aptitud", message: error.message });
  }
};
