const { Router } = require("express");
const {
  createProfesionalField,
  updateProfesionalField,
  getProfesional,
} = require("../controllers/profesional");
const { check } = require("express-validator");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");

const router = Router();

// crea un campo descripción para un empleador
router.post(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "El id debe de ser un MONGOID").isMongoId(),
    validationFields,
  ],
  createProfesionalField
);

// actualizar los campos
router.get(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmpployee", "El id debe de ser un MONGOID").isMongoId(),
    validationFields,
  ],
  getProfesional
);

// mostar los datos de un profesional by id
router.put(
  "/:idEmployee/:idProfesional",
  [
    validateJWT,
    check("idEmployee", "El id debe de ser un MONGOID").isMongoId(),
    check("idProfesional", "El id debe de ser un MONGOID").isMongoId(),
    validationFields,
  ],
  updateProfesionalField
);

module.exports = router;
