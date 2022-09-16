const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file);
    return res;
  } catch (error) {
    console.log(error);
  }
};
