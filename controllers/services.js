const { response, request } = require("express");
const Service = require("../models/Service");

// devuelve la lista con todos los servicios (puestos de trabajo)
const getAllServices = async (req = request, res = response) => {
  try {
    const { limit = 5, offset = 0 } = req.query;
    const services = await Service.find()
      .populate("employees")
      .limit(Number(limit))
      .skip(Number(offset));
    const total = await Service.countDocuments();
    res.json({
      total,
      services: services,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error",
    });
  }
};

// crea un nuevo servicio (puesto de trabajo)
const createNewService = async (req = request, res = response) => {
  const { body } = req;
  const service = new Service(body);
  await service.save();
  res.json({
    message: "create service",
    service,
  });
};

const getServicesById = async (req = request, res = response) => {
  const { id } = req.params;
  const resultService = await Service.findById(id).populate("employees");
  return res.json(resultService);
};

module.exports = {
  getAllServices,
  createNewService,
  getServicesById,
};
