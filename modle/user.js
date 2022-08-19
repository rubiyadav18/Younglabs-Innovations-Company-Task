const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String},
  password: { type: String},
  createdby: { type: String },
  token: { type: String },
  time : { type : Date, default: Date.now }
});


module.exports = mongoose.model("user", userSchema);