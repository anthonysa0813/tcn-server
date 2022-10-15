const { Router } = require("express");
const {
  createProfesionalField,
  updateProfesionalField,
  getProfesional,
} = require("../controllers/profesional");

const router = Router();

// crea un campo descripción para un empleador
router.post("/:idEmployee", createProfesionalField);

// actualizar los campos
router.get("/:idEmployee", getProfesional);

// mostar los datos de un profesional by id
router.put("/:idEmployee/:idProfesional", updateProfesionalField);

module.exports = router;
