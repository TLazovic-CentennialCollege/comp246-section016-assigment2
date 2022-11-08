// users.js, Tomislav Lazovic, 301229459, assignment 2 express portfolio web App,10/28/2022
let mongoose = require("mongoose");

// create a model class
let User = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);
