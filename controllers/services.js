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

const putServicesById = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const ServiceData = await Service.findById(id);
    const ServiceFind = await Service.findByIdAndUpdate(id, {
      status: !ServiceData.status,
    });
    return res.status(200).json(ServiceFind);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Service not found",
    });
  }
};

module.exports = {
  getAllServices,
  createNewService,
  getServicesById,
  putServicesById,
};
