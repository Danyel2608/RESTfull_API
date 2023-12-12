const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const houseSchema = new Schema(
  {
    name: {
      type: String,
      //campo obligatorio es required:true
      required: true,
    },
    words: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sigil: {
      type: String,
      required: true,
    },
    leader: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    settlements: {
      type: Array,
      require: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => {
            const keys = Object.keys(element);
            return keys.every((key) => typeof element[keys[0]] === "string");
          }),
        "Wrong settlements array",
      ],
    },
    religion: {
      type: String,
      required: true,
    },
    allies: {
      type: Array,
      require: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => {
            const keys = Object.keys(element);
            return keys.every((key) => typeof element[keys[0]] === "string");
          }),
        "Wrong allies array",
      ],
    },
    enemies: {
      type: Array,
      require: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => {
            const keys = Object.keys(element);
            return keys.every((key) => typeof element[keys[0]] === "string");
          }),
        "Wrong enemies array",
      ],
    },
    members: {
      type: Array,
      require: true,
      default: [],
      validate: [
        (array) =>
          array.length === 0 ||
          array.every((element) => {
            const keys = Object.keys(element);
            return keys.every((key) => typeof element[keys[0]] === "Array");
          }),
        "Wrong members array",
      ],
    },
  },
  {
    versionKey: false,
  }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
