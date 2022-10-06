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
    unique: true,
    required: [true, "El email es requerido"],
  },
  phone: {
    type: String,
    required: [true, "El teléfono es requerido"],
  },
  password: {
    type: String,
    required: [true, "El password es requerido"],
  },
  message: {
    type: String,
    required: false,
  },
  cv: {
    type: String,
    require: false,
  },
  callingCall: {
    type: String, 
    require: [true, "el codigo es requerido"]
  },
  country : {
    type: String, 
    require: [true, "El país es requerido"],
  },
  typeJob: {
      type: String,
      enum: ["PRESENCIAL", "HIBRIDO", "REMOTO", ""],
      default: "",
      required: false
    },
  service: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: false
  }],
  languages: [{
    type: String,
    required: false,
  }]
});

EmployeeShema.methods.toJSON = function () {
  const { _id: id, __v, ...rest } = this.toObject();
  return {
    id,
    ...rest,
  };
};

const model = mongoose.model("Employee", EmployeeShema);

module.exports = model;
