const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "el titulo es requerido"],
    },
    schedule: {
      type: String,
      required: [true, "el horario es requerido"],
    },
    salary: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
    },
    requirements: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Service", ServiceSchema);

module.exports = model;
