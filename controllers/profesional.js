const { request, response } = require("express");
const Employee = require("../models/employee");
const Profesional = require("../models/Profesional");

const getProfesional = async (req = request, res = response) => {
  const { idEmployee } = req.params;
  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    return res.status(400).json({
      message: "El usuario no se encuentra registrado",
    });
  }
  const profesional = await Profesional.findOne()
    .where("employee")
    .equals(idEmployee);
  return res.status(200).json(profesional);
};

const createProfesionalField = async (req = request, res = response) => {
  const { idEmployee } = req.params;
  const body = req.body;
  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    res.status(404).json({
      message: "El usuario no se encuentra en la base de datos",
    });
  }
  const profesionalModel = await new Profesional({
    title: body.title,
    description: body.description,
    education: body.education,
    employee: idEmployee,
  });
  await profesionalModel.save();

  res.status(200).json(profesionalModel);
};

const updateProfesionalField = async (req = request, res = response) => {
  const { idEmployee, idProfesional } = req.params;
  const body = req.body;
  const profesionalField = await Profesional.findById(idProfesional);
  const employee = await Employee.findById(idEmployee);

  if (!profesionalField || !employee) {
    res.status(404).json({
      message: "El usuario no se encuentra en la base de datos",
    });
  }

  await Profesional.findByIdAndUpdate(idProfesional, body);

  return res.json({
    message: "El profesional se actualizo",
  });
};

module.exports = {
  createProfesionalField,
  updateProfesionalField,
  getProfesional,
};
