const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es requerido"],
    trim: true,
  },
  nameBussiness: {
    type: String,
    required: [true, "El nombre de la empresa es requerido"],
    trim: true,
  },
  activyBussiness: {
    type: String,
    required: [true, "La actividad de la empresa es requerida"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción es requerida"],
    trim: true,
  },
  area: {
    type: String,
    required: [true, "El área es requerida"],
    trim: true,
  },
  subarea: {
    type: String,
    required: [true, "El subárea es requerida"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "El país es requerida"],
    trim: true,
  },
  level: {
    type: String,
    required: [true, "El nivel es requerido"],
    trim: true,
    enum: ["training", "junior", "semi senior", "senior"],
  },
  dateStart: {
    type: String,
    required: [true, "La fecha inicial es requerida"],
  },
  dateEnd: {
    type: String,
    required: false,
  },
  currentJob: {
    type: Boolean,
    default: false,
    required: false,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "el usuario es requerida"],
  },
  nameRef: {
    type: String,
    required: false,
    trim: true,
  },
  emailRef: {
    type: String,
    required: false,
    trim: true,
  },
  countryRef: {
    type: String,
    required: false,
    trim: true,
  },
  phoneRef: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
