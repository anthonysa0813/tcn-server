const { Router } = require("express");
const router = Router();
const { saveCvFile } = require("../helpers/save-cv-file");
const { check } = require("express-validator");
const validationFields = require("../middlewares/validationFields");
const User = require("../models/employee");
const { validateFile } = require("../middlewares/validationFile");
const fs = require("fs");
const path = require("path");
const validateJWT = require("../helpers/validate-jwt");

router.post("/", validateFile, async (req, res) => {
  const pathComplete = await saveCvFile(req.files, "curriculums");

  return res.status(200).json({
    path: pathComplete,
  });
});

module.exports = router;
