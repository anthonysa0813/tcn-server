const { Router } = require("express");
const {
  createKnoledge,
  deleteKnoledge,
  getAllKnowledge,
  getAllKnowledgeByFilter,
} = require("../controllers/knoledge");

const router = Router();
// traer los usuarios con ciertas habilidades
router.get("/", getAllKnowledgeByFilter);

// traer todos los conocimientos
router.get("/:idEmployee", getAllKnowledge);

// crear un conocimiento para un usuario (employee)
router.post("/:idEmployee", createKnoledge);

// eliminar un conocimiento
router.delete("/:idKnoledge", deleteKnoledge);

module.exports = router;
