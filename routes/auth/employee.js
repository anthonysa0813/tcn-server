const { Router } = require("express");

const { logingEmployee } = require("../../controllers/employee");

const router = Router();

// Login en Employee
router.post("/login", logingEmployee);

module.exports = router;
