const { request, response } = require("express");
const User = require("../models/auth");
const bcryptjs = require("bcryptjs");
const generateJWT = require("../helpers/generate-jwt");

const generator = require("generate-password");
const {
  sendNodeForgetAdminPass,
} = require("../mail_config/nodemailer/mailNodeForgetAdminPassword");
const {
  sendNodeCredentialsToAdmin,
} = require("../mail_config/nodemailer/mailNodeSendCredentialsAdmin");

const createUser = async (req = request, res = response) => {
  try {
    const body = req.body;
    const { email, password, superAdmin, role, name } = body;
    // si el email ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        message: "el email ya está en uso",
      });
    }
    // hashear el password
    const user = await new User({
      email,
      password,
      role,
      name,
      superAdmin,
    });
    const salt = await bcryptjs.genSaltSync();
    user.password = await bcryptjs.hashSync(password, salt);
    await user.save();
    sendNodeCredentialsToAdmin(email, name, password);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

// devuelve todos los users
const getUsers = async (req = request, res = response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

// login
const loginUser = async (req = request, res = response) => {
  try {
    // ver si existe el user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "El email no existe",
      });
    }

    // verificar la contraseña
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "El password es inválido",
      });
    }

    // generar el jwt
    const token = await generateJWT(user._id);
    // Cookies.set("token", token, { expires: 7 });

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Habla con el admin" });
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const { superAdmin, password, name, email } = data;
    const user = await User.findByIdAndUpdate(id, data);

    if (password) {
      const salt = await bcryptjs.genSaltSync();
      user.password = await bcryptjs.hashSync(password, salt);
    }

    user.save();
    return res.status(200).json({
      message: "El usuario fue actualizado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.json({
    message: "El usuario fue eliminado",
  });
};

const searchAuth = async (req = request, res = response) => {
  try {
    const { email } = req.params;
    const UserAuth = await User.findOne().where("email").equals(email);
    if (!UserAuth) {
      return res.json({
        user: [],
        message: "No se encontró ningún usuario con ese email.",
      });
    } else {
      return res.json({
        user: UserAuth,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// envio del nuevo password
const recoverAccount = async (req = request, res = response) => {
  try {
    const { emailUser } = req.params;
    const user = await User.findOne({ email: emailUser });
    const passRandom = await generator.generate({
      length: 10,
      numbers: true,
    });

    if (user.length === 0) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }

    const salt = await bcryptjs.genSaltSync();
    user.password = await bcryptjs.hashSync(passRandom, salt);
    user.save();

    // sendEmailForgetPassAdmin(emailUser, user.name, passRandom);
    // sendEmailForgetPassAdmin("anthonysa0813@gmail.com", user.name, passRandom);
    sendNodeForgetAdminPass(emailUser, user.name, passRandom);
    return res.json({
      message: "Se ha enviado un correo con los siguientes pasos...",
      user,
      passRandom,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
  searchAuth,
  recoverAccount,
};
