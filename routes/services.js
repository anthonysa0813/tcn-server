const { Router } = require("express");
const { getAllServices, createNewService, getServicesById } = require("../controllers/services");

const router = Router();

router.get("/", getAllServices);

router.post("/", createNewService);

// getServices by id with its employees applicated
router.get("/:id", getServicesById );



module.exports = router;