const jwt = require("jsonwebtoken");
const { request, response } = require("express");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");
  // verificación si están mandando el token

  if (!token) {
    return res.status(401).json({
      message: "not exist token",
    });
  }

  try {
    const id = jwt.verify(token, process.env.PUBLIC_KEY);
    console.log({ id });

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Token no válido",
    });
  }
};

module.exports = validateJWT;
