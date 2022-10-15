const mongoose = require("mongoose");

const LanguageSchema = mongoose.Schema({
  lang: {
    type: String,
    required: [true, "el nombre del idioma es requerido"],
    trim: true,
  },
  level: {
    type: String,
    required: [true, "el level es requerido"],
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
