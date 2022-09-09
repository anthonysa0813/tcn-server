const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, "El email es requerido"],
  },
  password: {
    type: String,
    required: [true, "El password es requerido"],
  },
  role: {
    type: String,
    required: false,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
    default: "ADMIN_ROLE",
  },
  image: {
    type: String,
    required: false,
  },
});

const model = mongoose.model("User", UserSchema);

module.exports = model;
