const User = require("../models/auth");

const isValidIdUser = async (id) => {
  const user = await User.findById(id);
  console.log({ usuario: user });
  if (!user) {
    throw new Error("No existe el usuario");
  }
};

module.exports = isValidIdUser;
