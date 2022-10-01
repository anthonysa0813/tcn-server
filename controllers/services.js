const { response, request } = require("express");
const Service = require("../models/Service")

const getAllServices = async (req = request, res = response) =>{
    const services = await Service.find()
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


module.exports = {
    getAllServices,
    createNewService
}