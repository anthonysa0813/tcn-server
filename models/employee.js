const mongoose = require("mongoose");

const EmployeeShema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "el nombre es requerido"],
  },
  surnames: {
    type: String,
    required: [true, "Los apellidos son requeridos"],
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
  },
  phone: {
    type: String,
    required: [true, "El teléfono es requerido"],
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
    default: false,
  },
  cv: {
    type: String,
    require: [true, "EL cv es requerido"],
  },
});

const model = mongoose.model("Employee", EmployeeShema);

module.exports = model;
