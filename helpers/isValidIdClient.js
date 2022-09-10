const { response, request } = require("express");
const Client = require("../models/clients");

const existIdClient = async (id) => {
  // console.log({ id });
  const client = await Client.findById(id);
  if (!client) {
    throw new Error("No existe el cliente");
  }
};

module.exports = existIdClient;
