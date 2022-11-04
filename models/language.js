const mongoose = require("mongoose");

const LanguageSchema = mongoose.Schema({
  lang: {
    type: String,
    required: [true, "el nombre del idioma es requerido"],
    trim: true,
  },
  levelWriter: {
    type: String,
    required: [true, "el nivel en escritura es requerido"],
    trim: true,
  },
  levelRead: {
    type: String,
    required: [true, "el nivel de lectura es requerido"],
    trim: true,
  },
  levelListen: {
    type: String,
    required: [true, "el nivel de escucha es requerido"],
    trim: true,
  },
  levelOral: {
    type: String,
    required: [true, "el nivel oral es requerido"],
    trim: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "el employee es requerido"],
  },
});

const model = mongoose.model("Language", LanguageSchema);

module.exports = model;
