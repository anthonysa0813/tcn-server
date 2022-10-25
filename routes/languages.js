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

const router = Router();

router.get("/", getLangs);
router.get("/filter", searchLanguagesByFilter);

// trear los lenguajes por usuario
router.get("/all/:idEmployee", getLangToEmployee);

router.post("/:idEmployee", createLang);

// actualizar los lenguajes ya creados
router.put("/:idEmployee/:idLang", putLangByEmployee);

// eliminar un lenguahe para un employee
router.delete("/:idLang", deleteLang);

// traer un único languaje para el employee
router.get("/:idLang", getUniqueLang);

module.exports = router;
