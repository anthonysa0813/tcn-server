const { Router } = require("express");
const { check } = require("express-validator");
const {
  getClients,
  postClients,
  updateStatusClient,
  getClientById,
  deleteClient,
} = require("../controllers/clients");
const existIdClient = require("../helpers/isValidIdClient");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");

const router = Router();

// Nota: debemos de agregar el token valido.

// trae todos los clientes
router.get("/", validationFields, getClients);

// crea un nuevo clientes

router.post(
  "/",
  [
    check("name", "el nombre es requerido").isString().not().isEmpty(),
    check("surnames", "los apellidos son requeridos")
      .isString()
      .not()
      .isEmpty(),
    check("email", "EL email es inválido").not().isEmpty().isEmail(),
    check("phone", "El telefono es requerido").not().isEmpty().isNumeric(),
    validationFields,
  ],
  postClients
);

// cliente por ID
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "el id no es válido - MONGOID").isMongoId(),
    check("id", "el id es inválido").custom(existIdClient),
    validationFields,
  ],
  getClientById
);

// elimina el cliente
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "el id es inválido - MONGOID").isMongoId(),
    check("id", "El id es inválido").custom(existIdClient),
    validationFields,
  ],
  deleteClient
);

// actualizar el status
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "el id es inválido - MONGOID").isMongoId(),
    check("id", "El id es inválido").custom(existIdClient),
    validationFields,
  ],
  updateStatusClient
);

module.exports = router;
