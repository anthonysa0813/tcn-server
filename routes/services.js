const { Router } = require("express");
const {
  getAllServices,
  createNewService,
  getServicesById,
  putServicesById,
} = require("../controllers/services");

const router = Router();

router.get("/", getAllServices);

router.post("/", createNewService);

// getServices by id with its employees applicated
router.get("/:id", getServicesById);

// actualizar el status del puesto de trabajo
router.put("/:idEmployee/:idService", putServicesById);

module.exports = router;
