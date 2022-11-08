// buisnessContact.js, Tomislav Lazovic, 301229459, assignment 2 express portfolio web App,10/28/2022
let mongoose = require("mongoose");

// create a model class
let BuisnessContact = mongoose.Schema(
  {
    name: String,
    number: String,
    email: String,
  },
  {
    collection: "buisnessContacts",
  }
);

module.exports = mongoose.model("BuisnessContact", BuisnessContact);
