const User = require("../models/auth");

const isValidIdUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("No existe el usuario");
  }
};

module.exports = isValidIdUser;
