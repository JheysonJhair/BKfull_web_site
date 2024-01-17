const User = require("../models/User");
const Interests = require('../models/Interests'); 
const Aptitudes = require('../models/Aptitudes');
const Briefcase = require('../models/Briefcase');
const path = require("path");
const os = require("os");
const fs = require("fs");

exports.getAll = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json({ msg: "exitoso", result: user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving User " });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { idUser, username, sobreMi, frase, cv, email, telefono, website, direccion, cargo } = req.body;


    if (!idUser || !username || !sobreMi || !frase || !cv || !email || !telefono || !website || !direccion || !cargo) {
      return res.status(400).json({ msg: "Uno o más campos están vacíos" });
    }

    const user = await User.create({
      idUser,
      username,
      sobreMi,
      frase,
      cv,
      email,
      telefono,
      website,
      direccion,
      cargo,
    });

    res.status(201).json({ msg: "Usuario registrado exitosamente", result: user });
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    res.status(500).json({ message: "Error al insertar usuario", error: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const { username, sobreMi, frase, cv, email, telefono, website, direccion, cargo } = req.body;

    if (!username || !sobreMi || !frase || !cv || !email || !telefono || !website || !direccion || !cargo)  {
      return res.status(400).json({ msg: "Uno o más campos están vacíos" });
    }

    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const result = await user.update({
      username,
      sobreMi,
      frase,
      cv,
      email,
      telefono,
      website,
      direccion,
      cargo,
    });

    res.json({ message: "Usuario actualizado exitosamente", result });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario", message: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const idUser = req.params.idUser;

    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await user.destroy();

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario", message: error.message });
  }
};

exports.updateCVById = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const cvFile = req.file; 

    if (!cvFile) {
      return res.status(400).json({ msg: "El archivo CV no está presente" });
    }

    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    user.cv = cvFile.buffer;
    await user.save();

    res.json({ message: "CV actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar CV:", error);
    res.status(500).json({ error: "Error al actualizar CV", message: error.message });
  }
};

exports.downloadCV = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const user = await User.findByPk(idUser, { attributes: ['cv'] });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const cvData = user.cv;

    if (!cvData) {
      return res.status(404).json({ error: "CV no encontrado para este usuario" });
    }

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
  } catch (error) {
    console.error("Error al descargar CV:", error);
    res.status(500).json({ error: "Error al descargar CV" });
  }
};

//////////////////////////////

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ error: "Error al obtener todos los usuarios" });
  }
};


exports.getAllInterests = async (req, res) => {
  try {
    const interests = await Interests.findAll({
      attributes: ['nombre', 'icono'],
    });

    res.json(interests);
  } catch (error) {
    console.error("Error al obtener todos los intereses:", error);
    res.status(500).json({ error: "Error al obtener todos los intereses" });
  }
};


exports.getAllAptitudes = async (req, res) => {
  try {
    const aptitudes = await Aptitudes.findAll({
      attributes: ['nombre', 'porcentaje', 'tipo'], 
      order: [['tipo']], 
    });

    res.json(aptitudes);
  } catch (error) {
    console.error("Error al obtener todas las aptitudes:", error);
    res.status(500).json({ error: "Error al obtener todas las aptitudes" });
  }
};

exports.getAllBriefcase = async (req, res) => {
  try {
    const projects = await Briefcase.findAll({
      attributes: ['proyecto', 'descripcion', 'web', 'gitHub', 'iconos', 'image', 'tipo', 'texto'],
      order: [['tipo']], 
    });

    res.json(projects);
  } catch (error) {
    console.error("Error al obtener todos los proyectos del portafolio:", error);
    res.status(500).json({ error: "Error al obtener todos los proyectos del portafolio" });
  }
};