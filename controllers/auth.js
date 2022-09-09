const User = require("../models/auth");
const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const { use } = require("../routes/auth");

const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;

  // si el email ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(401).json({
      message: "el email ya está en uso",
    });
  }

  // hashear el password

  const user = await new User({ email, password, name: "", image: "" });

  const salt = await bcryptjs.genSaltSync();
  user.password = await bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    message: "post",
    user,
  });
};

module.exports = {
  createUser,
};
