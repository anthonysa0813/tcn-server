const { Router } = require("express");
const {
  createKnoledge,
  deleteKnoledge,
  getAllKnowledge,
  getAllKnowledgeByFilter,
  getSkillByEmployee,
} = require("../controllers/knoledge");
const validationFields = require("../middlewares/validationFields");
const validateJWT = require("../helpers/validate-jwt");
const { check } = require("express-validator");

const router = Router();
// traer los usuarios con ciertas habilidades
router.get("/", [validateJWT, validationFields], getAllKnowledgeByFilter);

// traer todos los conocimientos
router.get(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "idEmployee debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  getAllKnowledge
);

// crear un conocimiento para un usuario (employee)
router.post(
  "/:idEmployee",
  [
    validateJWT,
    check("idEmployee", "idEmployee debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  createKnoledge
);

// eliminar un conocimiento
router.delete(
  "/:idKnoledge",
  [
    validateJWT,
    check("idKnoledge", "idKnoledge debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  deleteKnoledge
);

router.get(
  "/:idEmployee",
  [
    validateJWT,
    check("idKnoledge", "idKnoledge debe de ser un mongo id").isMongoId(),
    validationFields,
  ],
  getSkillByEmployee
);

module.exports = router;

