const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const existIdEmployee = require("../helpers/isValidIdEmployee");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");

const router = Router();

// trae todos los employees
router.get("/", [validateJWT, validationFields], getEmployees);

// crea un employee
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es requerido").not().isEmpty(),
    check("surnames", "Los apellidos son requeridos").not().isEmpty(),
    check("email", "El email está en blanco ó es inválido")
      .not()
      .isEmpty()
      .isEmail(),
    check("phone", "El phone es requido").not().isEmpty(),
    validationFields,
  ],
  postEmployee
);

// actualiza el status del employee
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "el id no es un id válido").isMongoId(),
    check("id", "el id no existe").custom(existIdEmployee),
    validationFields,
  ],
  updateEmployee
);

// elimia el employee
router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "el id no es un id válido").isMongoId(),
    check("id", "el id no existe").custom(existIdEmployee),
    validationFields,
  ],
  deleteEmployee
);

module.exports = router;
