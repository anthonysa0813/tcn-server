const { request, response } = require("express");
const cloudinaryFunc = require("../lib/cloudinary");
const Employee = require("../models/employee");
const Service = require("../models/Service");

const getEmployees = async (req = request, res = response) => {
  const users = await Employee.find().populate("service");

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
  const { body } = req;
  const user = await Employee.findById(id);

  const employee = await Employee.findByIdAndUpdate(id, body);

  res.json({
    message: "usuario actualizado",
  });
};

// add new Service to Employee
const addServiceToEmployee = async (req = request, res = response) => {
  const {idEmployee, idService} = req.params;
  console.log({idEmployee, idService});
  const employee = await Employee.findById(idEmployee);
  const service = await Service.findById(idService);

  if(employee.service.includes(idService)) {
    res.status(400).json({message: "el servicio ya está incluido"})
  }
  employee.service = [...employee.service, idService];
  console.log(employee)
  employee.save()
  if(!employee) {
      return res.status(400).json({message: "no se encontró al usuario"})
  };
  if(!service) {
    return res.status(400).json({message: "no se encontró al servicio"})
  };

  // await Employee.findByIdAndUpdate({service: idService});
   res.status(200).json(employee);
};
// elimina el employee
const deleteEmployee = async (req = request, res = response) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.json({
    message: "usuario eliminado",
  });
};

// show services by employee
const showServices = async (req = request, res = response) => {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate("service");
    if(!employee){
      return res.status(404).json({ message: "El usuario no se encontró	"})
    }
    console.log(employee); 
    res.status(200).json(employee)

};


module.exports = {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  addServiceToEmployee,
  showServices
};
