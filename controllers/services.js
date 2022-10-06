const { response, request } = require("express");
const Service = require("../models/Service")

const getAllServices = async (req = request, res = response) =>{
    const services = await Service.find().populate("employees")
    res.json(services)
}


const createNewService = async (req = request, res = response) => {

    const { body } = req;
    const service = new Service(body)
    await service.save()
    res.json({
        message: "create service",
        service
    })
}


const getServicesById  = async (req = request, res = response) => {
    const {id} = req.params;
    const resultService = await Service.findById(id).populate("employees");
    return res.json(resultService)
}


module.exports = {
    getAllServices,
    createNewService,
    getServicesById
}