const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
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
    check("cv", "el cv es requerido").not().isEmpty(),
    validationFields,
  ],
  postEmployee
);

// actualiza el status del employee
router.put("/:id", updateEmployee);

// elimia el employee
router.delete("/:id", deleteEmployee);

module.exports = router;
