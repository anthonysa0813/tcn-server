const { v4: uuidv4 } = require("uuid");
const path = require("path");

const saveCvFile = (files, nameFile) => {
  return new Promise((resolve, reject) => {
    let cv;
    let uploadPath;

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    cv = files.cv;

    // validar  la extensión
    const [_, extension] = cv.name.split(".");
    const nameTemporary = uuidv4() + "." + extension;
    console.log(extension);

    if (extension !== "pdf") {
      return reject("La extensión no es permitida");
    }

    uploadPath = path.join(
	__dirname,
      "../uploads/curriculums/",
      nameTemporary
    );
    pdfPath = `${process.env.SERVER_URL}uploads/curriculums/${nameTemporary}`;

    // Use the mv() method to place the file somewhere on your server
    cv.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);

      return resolve(pdfPath);
    });
  });
};

module.exports = { saveCvFile };
