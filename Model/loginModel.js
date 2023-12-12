const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const loginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    //ponemos 60 por el hash de bcrypt que sera de 60 
    minlength: 60,
    maxlength:60,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    trim: true,
    default: "user",
  },
});
const login = mongoose.model("Login", loginSchema);

module.exports = login;
