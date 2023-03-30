const Employee = require("../models/employee");

const existIdEmployee = async (id) => {
  // console.log({ id });
  const user = await Employee.findById(id);
  if (!user) {
    throw new Error("No existe el usuario");
  }
};

module.exports = existIdEmployee;
