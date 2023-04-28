const { Router } = require("express");
const {
  getExperienceByEmployee,
  createExperience,
  updateExperience,
  deleteExperience,
  getUniqueExperience,
} = require("../controllers/experience");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");
const { check } = require("express-validator");

const router = Router();

router.get(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  getExperienceByEmployee
);

// crear una nueva experiencia
router.post(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "el id debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  createExperience
);

// actualizar la experiencia
router.put(
  "/:idEmployee/:idExperience",
  [
    validateJWT,
    check("idEmployee", "idEmployee debe de ser un mongo id").isMongoId(),
    check("idExperience", "idExperience debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  updateExperience
);

// eliminar la experiencia
router.delete(
  "/:idEmployee/:idExperience",
  [
    validateJWT,
    check("idEmployee", "idEmployee debe de ser un mongo id").isMongoId(),
    check("idExperience", "idExperience debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  deleteExperience
);

// traer una sola experiencia
router.get(
  "/unique/:idEmployee/:idExperience",
  [
    validateJWT,
    check("idEmployee", "idEmployee debe de ser un mongo id").isMongoId(),
    check("idExperience", "idExperience debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  getUniqueExperience
);
module.exports = router;
