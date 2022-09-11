const { request, response } = require("express");

const getEmployees = (req = request, res = response) => {
  res.json({ message: "employee json jeje" });
};

const postEmployee = (req = request, res = response) => {
  res.json({
    message: "post employee",
  });
};

const updateEmployee = (req = request, res = response) => {
  res.json({
    message: "put status employee",
  });
};

const deleteEmployee = (req = request, res = response) => {
  res.json({
    message: "delete el employee",
  });
};

module.exports = {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
};
