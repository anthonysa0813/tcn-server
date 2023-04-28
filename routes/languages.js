const { Router } = require("express");
const {
  createLang,
  getLangToEmployee,
  getLangs,
  putLangByEmployee,
  deleteLang,
  getUniqueLang,
  searchLanguagesByFilter,
} = require("../controllers/languages");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validateJWT, validationFields], getLangs);
router.get("/filter", [validateJWT, validationFields], searchLanguagesByFilter);

// trear los lenguajes por usuario
router.get(
  "/all/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "el id debe de ser un Mongo Id").isMongoId(),
    validationFields,
  ],
  getLangToEmployee
);

router.post(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "el id debe de ser un Mongo").isMongoId(),
    validationFields,
  ],
  createLang
);

// actualizar los lenguajes ya creados
router.put(
  "/:idEmployee/:idLang",
  [
    validateJWT,
    check("idEmployee", "idEmployee debe de ser un mongo id").isMongoId(),
    check("idLang", "idEmployee debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  putLangByEmployee
);

// eliminar un lenguahe para un employee
router.delete(
  "/:idLang",
  [
    validateJWT,
    check("idLang", "debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  deleteLang
);

// traer un único languaje para el employee
router.get(
  "/:idLang",
  [
    validateJWT,
    check("idLang", "Debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  getUniqueLang
);

module.exports = router;
