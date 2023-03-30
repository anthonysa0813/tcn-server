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
  superAdmin: {
    type: Boolean,
    default: false,
    required: false,
  },
  role: {
    type: String,
    required: false,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
    default: "USER_ROLE",
  },
});

UserSchema.methods.toJSON = function () {
  const { email, role, _id: id, __v, name, superAdmin } = this.toObject();
  return { email, role, name, id, superAdmin };
};
const model = mongoose.model("User", UserSchema);

module.exports = model;
