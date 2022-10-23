const { request, response } = require("express");
const Language = require("../models/language");
const Employee = require("../models/employee");

const getLangs = async (req = request, res = response) => {
  const languages = await Language.find();
  res.status(200).json(languages);
};

const createLang = async (req = request, res = response) => {
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
  res.json(lang);
};

const getLangToEmployee = async (req = request, res = response) => {
  const { idEmployee } = req.params;
  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    return res.status(401).json({
      message: "El usuario no se encuentra en la base de datos",
    });
  }

  const languages = await Language.find().where("employee").equals(idEmployee);

  res.status(200).json(languages);
};

// traer un único languaje por employee
const getUniqueLang = async (req = request, res = response) => {
  const { idLang } = req.params;
  const language = await Language.findById(idLang);
  if (!language) {
    return res.status(404).json({
      message: "El idioma no se encuentra en la base de datos",
    });
  }
  res.json(language);
};

// actualizar
const putLangByEmployee = async (req = request, res = response) => {
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

  // await Language.findByIdAndUpdate(idLang, body);
  // return res.status(200).json({
  //   message: "el idioma fue actualizado satisfactoriamente",
  // });
};

// eliminar
const deleteLang = async (req = request, res = response) => {
  const { idLang } = req.params;
  const language = await Language.findById(idLang);
  if (!language) {
    return res.status(400).json({
      message: "El idioma no se encuentra en la base de datos",
    });
  }

  await Language.findByIdAndDelete(idLang);
  res.json({
    message: "El idioma ha sido eliminado",
  });
};

module.exports = {
  getLangs,
  createLang,
  getLangToEmployee,
  putLangByEmployee,
  deleteLang,
  getUniqueLang,
};
