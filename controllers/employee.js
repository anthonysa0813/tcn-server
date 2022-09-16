const { request, response } = require("express");
const cloudinaryFunc = require("../lib/cloudinary");
const Employee = require("../models/employee");

const getEmployees = async (req = request, res = response) => {
  const users = await Employee.find();

  res.json(users);
};

const postEmployee = async (req = request, res = response) => {
  const body = req.body;

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.cv) {
    res.status(400).send("No hay archivos que subir");
    return;
  }

  const { cv } = req.files;
  // revisar si son pdf o word
  const extensionFile = cv.name.split(".");

  const validatesExtensions = ["pdf", "docx"];
  if (!validatesExtensions.includes(extensionFile[extensionFile.length - 1])) {
    res.status(400).json({
      message: `la extensión no es válida, solo aceptamos archivos ${validatesExtensions}`,
    });
  }

  // guardar el archivo en cloudinary
  const { secure_url } = await cloudinaryFunc(cv.tempFilePath);

  const data = {
    message: "",
    status: true,
    ...body,
    cv: secure_url,
  };

  // guardar employee en la DB
  const user = new Employee(data);

  await user.save();

  res.status(200).json(user);
};

// actualiza el estatus a false
const updateEmployee = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await Employee.findById(id);

  const employee = await Employee.findByIdAndUpdate(id, {
    status: !user.status,
  });

  res.json({
    message: "usuario actualizado",
  });
};

// elimina el employee
const deleteEmployee = async (req = request, res = response) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.json({
    message: "usuario eliminado",
  });
};

module.exports = {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
};
