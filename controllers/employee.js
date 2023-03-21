const { request, response } = require("express");
const cloudinaryFunc = require("../lib/cloudinary");
const Employee = require("../models/employee");
const Service = require("../models/Service");
const EmployeeJobStatus = require("../models/employeeJobStatus");
const bcrypt = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");
const { emailNewPassword, activeEmployeeEmail } = require("../helpers/email");
var jwt = require("jsonwebtoken");
const {
  sendCredentialsToNewPassword,
  sendEmailToActivateAccount,
} = require("../mail_config/mailJetSendCredentials");

const getEmployees = async (req = request, res = response) => {
  try {
    const { limit, offset } = req.query;
    //http://localhost:5050/api/users?offset=10&limit=5

    if (limit && offset) {
      const users = await Employee.find()
        .populate("service")
        .limit(Number(limit))
        .skip(Number(offset));
      const total = await Employee.countDocuments();

      return res.json({
        users,
        total,
      });
    } else {
      const users = await Employee.find().populate("service");
      const total = await Employee.countDocuments();

      return res.json({
        users,
        total,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const postEmployee = async (req = request, res = response) => {
  try {
    const body = req.body;
    // ver si existe el email
    let { email, password, name } = body;
    const employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // hashear la contraseña
    const salt = await bcrypt.genSaltSync();
    password = await bcrypt.hashSync(password, salt);

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.cv) {
      res.status(400).send("No hay archivos que subir");
      return;
    }

    const { cv } = req.files;
    // revisar si son pdf o word
    const extensionFile = cv.name.split(".")[1]; // extension del archivo

    const validatesExtensions = ["pdf"];
    // console.log("extensionFile", extensionFile);
    if (!validatesExtensions.includes(extensionFile)) {
      return res.status(400).json({
        message: `la extensión no es válida, solo aceptamos archivos ${validatesExtensions}`,
      });
    }

    // guardar el archivo en cloudinary
    const { secure_url } = await cloudinaryFunc(cv.tempFilePath);
    // console.log("cv", cv.tempFilePath);
    // console.log("secure_url", secure_url);
    const data = {
      message: "",
      status: false,
      ...body,
      password,
      cv: secure_url,
    };

    // guardar employee en la DB
    const user = new Employee(data);
    await user.save();
    const token = await generateJWT(user._id);
    // console.log(user);
    await sendEmailToActivateAccount(email, name, user._id, token);
    console.log({
      email,
      name,
      id: user._id,
      token,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

// actualiza el estatus a false
const updateEmployee = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await Employee.findById(id);

    const employee = await Employee.findByIdAndUpdate(id, body);

    return res.json({
      message: "usuario actualizado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

// add new Service to Employee ( agregar una postulación a un employee)
const addServiceToEmployee = async (req = request, res = response) => {
  try {
    const { idEmployee, idService } = req.params;
    const employee = await Employee.findById(idEmployee);
    const service = await Service.findById(idService);

    if (!employee) {
      return res.status(400).json({ message: "no se encontró al usuario" });
    }
    if (!service) {
      return res.status(400).json({ message: "no se encontró al servicio" });
    }
    if (!service.status) {
      return res
        .status(400)
        .json({ message: "Ya finalizó el proceso de postulación" });
    }
    console.log({ service });

    if (employee.servicesId.includes(idService)) {
      return res
        .status(400)
        .json({ messageError: "Ya haz aplicado anteriormente a este puesto" });
    } else {
      employee.service = [...employee.service, idService];
      employee.servicesId = [...employee.servicesId, idService];
      service.employees = [...service.employees, idEmployee];
      employee.save();
      service.save();
      return res.status(200).json(employee);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

// elimina el employee
const deleteEmployee = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    return res.json({
      message: "usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
      error: error.message,
    });
  }
};

// show services by employee
const showServices = async (req = request, res = response) => {
  const { id } = req.params;
  const employee = await Employee.findById(id).populate("service");
  if (!employee) {
    return res.status(404).json({ message: "El usuario no se encontró	" });
  }

  res.status(200).json(employee);
};

const logingEmployee = async (req = request, res = response) => {
  try {
    const { body } = req;
    const { email, password } = body;
    // verificar si el usuario existe
    const employee = await Employee.findOne({ email: email });
    if (!employee) {
      return res.status(400).json({ message: "No Existe el usuario" });
    }

    // verificar la contraseña
    const validPassword = await bcrypt.compareSync(password, employee.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "La contraseña es incorrecta",
      });
    }

    const token = await generateJWT(employee.id);
    return res.json({
      employee,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const getEmployeesById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Es necesario que mandes el Id" });
    }
    const employee = await Employee.findById(id).populate("service");
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

// activar al usuario (employee)
const activeEmployee = async (req = request, res = response) => {
  try {
    const { idEmployee } = req.params;
    const { token } = req.body;

    const employee = await Employee.findById(idEmployee);
    if (!employee) {
      return res.status(400).json({ message: "El usuario no se encontró" });
    }
    const isValidToken = jwt.verify(token, process.env.PUBLIC_KEY);

    employee.status = true;
    employee.save();
    return res.json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

//  olvidó la contraseña
const sendEmailForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await Employee.find().where("email").equals(email);
    const employeeId = employee[0].id;
    console.log("user", employee);
    if (!employee) {
      return res.status(400).json({
        message: "El usuario no Existe",
      });
    }
    const token = await generateJWT(employeeId);
    // await emailNewPassword({
    //   email,
    //   token,
    //   name: employee[0].name,
    // });
    await sendCredentialsToNewPassword(email, employee[0].name, token);

    return res.status(200).json({
      message:
        "Porfavor, revisé su bandeja de correo para los siguientes pasos.",
    });
  } catch (error) {
    return res.status(400).json({ message: "Hubo un error" });
  }
};

const resetPassword = async (req = request, res = response) => {
  try {
    const { email, password, token } = req.body;
    // verificando si es un token valido
    const tokenValid = await jwt.verify(token, process.env.PUBLIC_KEY);
    console.log("token valid", tokenValid.id);
    const userEmployee = await Employee.find().where("email").equals(email);

    if (password) {
      const salt = await bcrypt.genSaltSync();
      userEmployee[0].password = await bcrypt.hashSync(password, salt);
    }

    console.log("id=>", tokenValid.id);
    console.log("body", userEmployee);
    const userUpdate = await Employee.findByIdAndUpdate(
      tokenValid.id,
      userEmployee[0]
    );
    await userUpdate.save();

    return res.json({
      message: "La contraseña ha sido modificado",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Ocurrió un error - token no válido",
    });
  }
};

const changeStatusJob = async (req = request, res = response) => {
  try {
    const { statusOption, idEmployee } = req.body;
    const employee = await Employee.findById(idEmployee);
    if (!employee) {
      return res.status(404).json({
        message: "No se encontró al usuario",
      });
    }

    if (statusOption !== "VISTO") {
      employee.statusJob = statusOption;
      employee.save();
      return res.json({ message: "ok", employee });
    } else if (statusOption === "VISTO" || employee.statusJob === "VISTO") {
      if (employee.statusJob === "ENTREGADO") {
        employee.statusJob = "VISTO";
        employee.save();
        return res.json({ message: "ok", employee });
      } else {
        return res.json({ message: "ok", employee });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const addEmployeeJobStatus = async (req = request, res = response) => {
  try {
    const { idEmployee, idService, statusValue } = req.body;

    const employee = await EmployeeJobStatus.find()
      .where({
        service: idService,
      })
      .where({ employee: idEmployee });

    // const existEmployeeApplication = employee.filter(
    //   (emp) => emp.employee === idEmployee
    // );

    // return res.json(employee);

    if (employee.length > 0) {
      return res.status(300).json({
        message: "Ya ha aplicado a este puesto",
      });
    } else {
      const jobApplication = new EmployeeJobStatus({
        employee: idEmployee,
        service: idService,
        status: statusValue,
      });
      jobApplication.save();
      return res.status(200).json(jobApplication);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const updateEmployeeJobStatus = async (req = request, res = response) => {
  try {
    const { idJobStatus } = req.params;
    const { status } = req.body;
    const employeeJobStatus = await EmployeeJobStatus.findById(idJobStatus);
    employeeJobStatus.status = status;
    employeeJobStatus.save();
    return res.json({ message: "se ha modificado" });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const getAllApplicationsJobByEmployeeId = async (
  req = request,
  res = response
) => {
  try {
    const { idEmployee } = req.params;
    const employee = await EmployeeJobStatus.find().where({
      employee: idEmployee,
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const searchEmployee = async (req = request, res = response) => {
  try {
    const { email, dni, statusJob } = req.query;
    if (email) {
      const userSearchByEma = await Employee.findOne({ email });
      if (!userSearchByEma) {
        return res.status(404).json([]);
      } else {
        return res.status(200).json([userSearchByEma]);
      }
    } else if (dni) {
      const userSearchByDni = await Employee.find().where("dni").equals(dni);
      return res.status(200).json(userSearchByDni);
    } else if (statusJob) {
      const userSearchByStatus = await Employee.find()
        .where("statusJob")
        .equals(statusJob);
      return res.status(200).json(userSearchByStatus);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

module.exports = {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  addServiceToEmployee,
  showServices,
  logingEmployee,
  getEmployeesById,
  activeEmployee,
  sendEmailForgetPassword,
  resetPassword,
  changeStatusJob,
  searchEmployee,
  addEmployeeJobStatus,
  getAllApplicationsJobByEmployeeId,
  updateEmployeeJobStatus,
};
