const mongoose = require("mongoose");
//schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 150,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error(`"${value}" is not a valid gender`);
      }
    },
  },
  photoURL: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA6g9BWr61gs6KYIq3zjFEy36Z8OuOIJQ75A&s",
  },
  about: {
    type: String,
    default: "This is a default about the user!",
  },
  skills: {
    type: [String],
  },
});
//model
const User = mongoose.model("User", userSchema);
module.exports = User;
