const { Router } = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers/auth");
const validationFields = require("../middlewares/validationFields");

const router = Router();

// devuelve la lista de todos los usuarios registrados
router.get("/", (req, res) => {
  res.json({
    message: "auth :D",
  });
});

// crear un nuevo usuario
router.post(
  "/register",
  [check("email", "El email es incorrecto").isEmail(), validationFields],
  createUser
);

// actualiza un usuario

// elimina un usuario

module.exports = router;
