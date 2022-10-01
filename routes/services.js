const { Router } = require("express");
const { getAllServices, createNewService } = require("../controllers/services");

const router = Router();

router.get("/", getAllServices);

router.post("/", createNewService);




module.exports = router;