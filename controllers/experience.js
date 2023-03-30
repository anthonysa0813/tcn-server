const { request, response } = require("express");
const Employee = require("../models/employee");
const Experience = require("../models/Experience");

// traer una experiencia por usuario
const getExperienceByEmployee = async (req, res) => {
  const { idEmployee } = req.params;

  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    return res.status(400).json({
      message: "El usuario no existe",
    });
  }

  const experiences = await Experience.find()
    .where("employee")
    .equals(idEmployee);

  res.json(experiences);
};

// crear una experiencia para un usuario
const createExperience = async (req = request, res = response) => {
  const body = req.body;
  const { idEmployee } = req.params;

  // ver si existe el usuario
  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    return res.status(400).json({
      message: "El usuario no existe",
    });
  }

  const newExperience = await new Experience({
    ...body,
    employee: idEmployee,
  });

  await newExperience.save();

  res.json(newExperience);
};

// actualizar la experiencia
const updateExperience = async (req = request, res = response) => {
  try {
    const body = req.body;
    const { idEmployee, idExperience } = req.params;
    const employee = await Employee.findById(idEmployee);
    const experience = await Experience.findByIdAndUpdate(idExperience, body);
    const experienceUpdate = await Experience.findById(idExperience);

    if (!employee || !experience) {
      return res.status(400).json({
        message: "El usuario ó la experiencia no existe",
      });
    }
    res.json(experienceUpdate);
  } catch (error) {
    res.status(500).json({
      error: "Error, la url no existe",
    });
  }
};

// eliminar la experiencia
const deleteExperience = async (req = request, res = response) => {
  const { idEmployee, idExperience } = req.params;
  const employee = await Employee.findById(idEmployee);
  const experience = await Experience.findByIdAndDelete(idExperience);

  if (!employee || !experience) {
    return res.status(400).json({
      message: "El usuario ó la experiencia no existe",
    });
  }

  res.json({
    message: "delete experience",
  });
};

// traer una sola experiencia

const getUniqueExperience = async (req = request, res = response) => {
  const { idEmployee, idExperience } = req.params;
  const employee = await Employee.findById(idEmployee);
  const experience = await Experience.findById(idExperience)
    .where("employee")
    .equals(idEmployee);

  if (!employee || !experience) {
    return res.status(400).json({
      message: "El usuario o la experiencia no existe",
    });
  }

  res.json(experience);
};

module.exports = {
  getExperienceByEmployee,
  createExperience,
  updateExperience,
  deleteExperience,
  getUniqueExperience,
};
