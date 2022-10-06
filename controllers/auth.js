const { request, response } = require("express");
const User = require("../models/auth");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");

const createUser = async (req = request, res = response) => {
  const { email, password,role } = req.body;



  // si el email ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(401).json({
      message: "el email ya está en uso",
    });
  }

  // hashear el password

  const user = await new User({ email, password, role, name: "", image: "", surnames: "", phone: "", callingCall: "", typeJob: "", cv: ""  });

  const salt = await bcryptjs.genSaltSync();
  user.password = await bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json(user);
};

// devuelve todos los users
const getUsers = async (req = request, res = response) => {
  const users = await User.find();
  res.status(200).json(users);
};

// login
const loginUser = async (req = request, res = response) => {
  try {
    // ver si existe el user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "El email no existe",
      });
    }

    // verificar la contraseña
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({
        message: "El password es inválido",
      });
    }

    // generar el jwt
    const token = await generateJWT(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Habla con el admin" });
  }
};

const updateUser = async (req = request, res = response) => {
  const data = req.body;
  const { id } = req.params;

  await User.findByIdAndUpdate(id, data);

  res.status(200).json({
    message: "El usuario fue actualizado",
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.json({
    message: "El usuario fue eliminado",
  });
};

module.exports = {
  createUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
};
