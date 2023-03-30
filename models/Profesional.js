const mongoose = require("mongoose");

const ProfesionalSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "El título es requerido"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "La descripción es requerida"],
  },
  education: {
    type: String,
    trim: true,
    required: [true, "La descripción es requerida"],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "el employee es requerido"],
  },
});

const model = mongoose.model("Profesional", ProfesionalSchema);

module.exports = model;
