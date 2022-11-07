const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Es nombre es requerido"],
    trim: true,
  },
  level: {
    type: String,
    required: [true, "El nivel es requerido"],
    trim: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "el employee es requerido"],
  },
});

module.exports = mongoose.model("Knoledge", Schema);
