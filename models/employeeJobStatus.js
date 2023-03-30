const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeJobStatusSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("EmployeeJobStatus", EmployeeJobStatusSchema);

module.exports = model;
