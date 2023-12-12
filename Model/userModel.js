const mongoose = require("mongoose");
//importar esquemas
const Schema = mongoose.Schema;

//crear esquema
const userSchema = new Schema(
  {
    name: {
      type: String,
      //campo obligatorio es required:true
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: false,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => {
            const keys = Object.keys(element);
            return (
              keys.every((key) => typeof element[keys[0]] === "boolean") &&
              typeof element[keys[1]] === "string"
            );
          }),
        "Wrong skills array",
      ],
    },
    personality: {
      type: Object,
      required: false,
      validate: [
        (obj) =>
          obj.constructor === Object &&
          Object.values(obj).every((element) => typeof element === "string"),
        "wrong personality object",
      ],
    },
  },
  {
    versionKey: false,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
