const { Router } = require("express");
const {
  getAllServices,
  createNewService,
  getServicesById,
  putServicesById,
  deleteService,
} = require("../controllers/services");
const validateJWT = require("../helpers/validate-jwt");
const validationFields = require("../middlewares/validationFields");
const { check } = require("express-validator");

const router = Router();

router.get("/", getAllServices);

router.post("/", [validateJWT, validationFields], createNewService);

// getServices by id with its employees applicated
router.get(
  "/:id",
  [
    validateJWT,
    check("id", "el id debe de ser un mongoId").isMongoId(),
    validationFields,
  ],
  getServicesById
);

// actualizar el status del puesto de trabajo
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "el id debe de ser un mongoId").isMongoId(),
    validationFields,
  ],
  putServicesById
);

// Eliminando el servicio
router.delete(
  "/:idService",
  [
    validateJWT,
    check("idService", "el id debe de ser un mongoId").isMongoId(),
    validationFields,
  ],
  deleteService
);

module.exports = router;
