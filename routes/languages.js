const { Router } = require("express");
const {
  createLang,
  getLangToEmployee,
  getLangs,
  putLangByEmployee,
} = require("../controllers/languages");

const router = Router();

router.get("/", getLangs);

// trear los lenguajes por usuario
router.get("/:idEmployee", getLangToEmployee);

router.post("/:idEmployee", createLang);

// actualizar los lenguajes ya creados
router.put("/:idEmployee/:idLang", putLangByEmployee);

module.exports = router;
