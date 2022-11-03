const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
} = require("../../controllers/auth");
const isValidIdUser = require("../../helpers/isValidID");
const validateJWT = require("../../helpers/validate-jwt");
const validationFields = require("../../middlewares/validationFields");

const router = Router();

// devuelve la lista de todos los usuarios registrados
router.get("/", getUsers);

// crear un nuevo usuario
router.post(
  "/register",
  [check("email", "El email es incorrecto").isEmail(), validationFields],
  createUser
);

// login
router.post("/login", loginUser);

// actualiza un usuario
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "el id es inválido").isMongoId(),
    check("id", "no existe el id").custom(isValidIdUser),
    validationFields,
  ],
  updateUser
);

// elimina un usuario

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "el id es inválido").isMongoId(),
    check("id", "no existe el id").custom(isValidIdUser),
    validationFields,
  ],
  deleteUser
);

module.exports = router;