const { Router } = require("express");
const router = Router();
const { saveCvFile } = require("../helpers/save-cv-file");
const { check } = require("express-validator");
const validationFields = require("../middlewares/validationFields");
const User = require("../models/employee");
const { validateFile } = require("../middlewares/validationFile");
const fs = require("fs");
const path = require("path");

router.post("/", validateFile, async (req, res) => {
  const pathComplete = await saveCvFile(req.files, "curriculums");

  return res.status(200).json({
    path: pathComplete,
  });
});

router.put(
  "/:id",
  [
    validateFile,
    check("id", "El id debe de ser un mongo Id").isMongoId(),
    validationFields,
  ],
  async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }
    const idCv = user.cv.split("uploads");
    user.cv = await saveCvFile(req.files, "curriculums");
    // borrar el anterior cv
    // const pathName = path.join(__dirname, "../uploads", idCv[1]);

    // if (fs.existsSync(pathName)) {
    //   fs.unlinkSync(pathName);
    // }
    await user.save();

    res.json({
      message: "El usuario fue actualizado",

      pathName,
    });
  }
);

module.exports = router;
