const { Router } = require("express");
const {
  getExperienceByEmployee,
  createExperience,
  updateExperience,
  deleteExperience,
  getUniqueExperience,
} = require("../controllers/experience");

const router = Router();

router.get("/:idEmployee", getExperienceByEmployee);

// crear una nueva experiencia
router.post("/:idEmployee", createExperience);

// actualizar la experiencia
router.put("/:idEmployee/:idExperience", updateExperience);

// eliminar la experiencia
router.delete("/:idEmployee/:idExperience", deleteExperience);

// traer una sola experiencia
router.get("/unique/:idEmployee/:idExperience", getUniqueExperience);
module.exports = router;
