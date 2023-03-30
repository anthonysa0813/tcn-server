const { response, request } = require("express");
const Client = require("../models/clients");

// trae la lista de clientes
const getClients = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};

// crea un cliente
const postClients = async (req = request, res = response) => {
  const body = req.body;
  const data = {
    message: "no message",
    status: true,
    ...body,
  };

  const user = await Client(data);
  user.save();

  res.json({ message: "Post client :d", user });
};

// actualiza el status
const updateStatusClient = async (req = request, res = response) => {
  const { id } = req.params;
  const client = await Client.findById(id);

  await Client.findByIdAndUpdate(id, { status: !client.status });

  res.json({
    message: "update staatus by client",
  });
};

// cliente por id
const getClientById = async (req = request, res = response) => {
  const { id } = req.params;
  const client = await Client.findById(id);

  res.json(client);
};

// elimia un cliente
const deleteClient = async (req = request, res = response) => {
  const { id } = req.params;
  await Client.findByIdAndDelete(id);

  res.json({
    message: "delete client",
  });
};

module.exports = {
  getClients,
  postClients,
  updateStatusClient,
  getClientById,
  deleteClient,
};
