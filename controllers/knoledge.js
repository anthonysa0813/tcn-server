const { response, request, json } = require("express");
const Employee = require("../models/employee");
const Knoledge = require("../models/Knoledge");

const getAllKnowledge = async (req = request, res = response) => {
  const { idEmployee } = req.params;
  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    return res.status(400).json({
      message: "El usuario no existe",
    });
  }
  const knoledges = await Knoledge.find().where("employee").equals(idEmployee);
  return res.json(knoledges);
};

const createKnoledge = async (req = request, res = response) => {
  const { idEmployee } = req.params;
  const body = req.body;
  const employee = await Employee.findById(idEmployee);
  if (!employee) {
    return res.status(400).json({
      message: "El usuario no existe",
    });
  }
  const knoledge = await new Knoledge({
    name: body.name,
    level: body.level,
    employee: idEmployee,
  });
  await knoledge.save();

  return res.json(knoledge);
};

// eliminar el knoledge
const deleteKnoledge = async (req = request, res = response) => {
  const { idKnoledge } = req.params;
  const knoledge = await Knoledge.findByIdAndDelete(idKnoledge);
  return res.json({
    message: "La habilidad ha sido eliminada",
  });
};
const getAllKnowledgeByFilter = async (req = request, res = response) => {
  try {
    const query = req.query;
    const { hability } = query;
    const employees = await Knoledge.find()
      .where("name")
      .equals(hability)
      .populate("employee");

    return res.json(employees);
  } catch (error) {
    return res.json({ message: "Hubo un error" });
  }
};

module.exports = {
  createKnoledge,
  deleteKnoledge,
  getAllKnowledge,
  getAllKnowledgeByFilter,
};
