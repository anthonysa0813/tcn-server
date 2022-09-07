const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log(`se conectó correctamente!`);
  } catch (err) {
    console.log("Hubo un error en la conexión");
  }
};

module.exports = connectDB;
