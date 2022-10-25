const { request, response } = require("express");
const Language = require("../models/language");
const Employee = require("../models/employee");

const getLangs = async (req = request, res = response) => {
  try {
    const languages = await Language.find();
    return res.status(200).json(languages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "El idioma no se encuentra en la base de datos",
    });
  }
};

const createLang = async (req = request, res = response) => {
  try {
    const { body } = req;
    const { idEmployee } = req.params;
    const employee = await Employee.findById(idEmployee);

    if (!employee) {
      return res.status(401).json({
        message: "El usuario no se encuentra en la base de datos",
      });
    }

    // crear el lenguage con el employee
    const lang = await new Language({
      lang: body.lang,
      levelWriter: body.levelWriter,
      levelOral: body.levelOral,
      employee: idEmployee,
    });
    lang.save();
    return res.json(lang);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "El idioma no se encuentra en la base de datos",
    });
  }
};

const getLangToEmployee = async (req = request, res = response) => {
  try {
    const { idEmployee } = req.params;
    const employee = await Employee.findById(idEmployee);
    if (!employee) {
      return res.status(401).json({
        message: "El usuario no se encuentra en la base de datos",
      });
    }

    const languages = await Language.find()
      .where("employee")
      .equals(idEmployee);

    return res.status(200).json(languages);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "El idioma no se encuentra en la base de datos",
    });
  }
};

// traer un único languaje por employee
const getUniqueLang = async (req = request, res = response) => {
  try {
    const { idLang } = req.params;
    const language = await Language.findById(idLang);
    if (!language) {
      return res.status(404).json({
        message: "El idioma no se encuentra en la base de datos",
      });
    }
    return res.json(language);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "El idioma no se encuentra en la base de datos",
    });
  }
};

// actualizar
const putLangByEmployee = async (req = request, res = response) => {
  try {
    const { idEmployee, idLang } = req.params;
    const body = req.body;
    console.log(idLang);
    const language = await Language.find().where("employee").equals(idEmployee);
    console.log(language);
    if (!language) {
      return res.status(400).json({
        message: "El idioma no se encuentra en la base de datos",
      });
    }
    res.json(language);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "hubo un error",
    });
  }
};

// eliminar
const deleteLang = async (req = request, res = response) => {
  try {
    const { idLang } = req.params;
    const language = await Language.findById(idLang);
    if (!language) {
      return res.status(400).json({
        message: "El idioma no se encuentra en la base de datos",
      });
    }

    await Language.findByIdAndDelete(idLang);
    return res.json({
      message: "El idioma ha sido eliminado",
    });
  } catch (error) {
    return res.json({
      message: "hubo un error",
    });
  }
};

const searchLanguagesByFilter = async (req = request, res = response) => {
  const { language, nivel } = req.query;
  const languagesFinds = await Language.find()
    .where("lang")
    .equals(language)
    .where("levelOral")
    .equals(nivel)
    .populate("employee");

  res.json(languagesFinds);
};

module.exports = {
  getLangs,
  createLang,
  getLangToEmployee,
  putLangByEmployee,
  deleteLang,
  getUniqueLang,
  searchLanguagesByFilter,
};
