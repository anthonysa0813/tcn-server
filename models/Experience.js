const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es requerido"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción es requerida"],
    trim: true,
  },
  dateStart: {
    type: Date,
    required: [true, "La fecha inicial es requerida"],
  },
  dateEnd: {
    type: Date,
    required: [true, "La fecha final es requerida"],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "el usuario es requerida"],
  },
});

const model = mongoose.model("Experience", ExperienceSchema);
