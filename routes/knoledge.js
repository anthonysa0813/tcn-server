const { Router } = require("express");
const {
  createKnoledge,
  deleteKnoledge,
  getAllKnowledge,
} = require("../controllers/knoledge");

const router = Router();

// traer todos los conocimientos
router.get("/:idEmployee", getAllKnowledge);

// crear un conocimiento para un usuario (employee)
router.post("/:idEmployee", createKnoledge);

// eliminar un conocimiento
router.delete("/:idKnoledge", deleteKnoledge);

module.exports = router;
