const mongoose = require("mongoose");
const user = new mongoose.Schema({
  userName: {
    type: String,
  },
  phonNumber: {
    type: Number,
  },
  room: {
    type: String,
  },
  email: {
    type: String,
  },
  location: {
    type: String,
  },
  date:{
    type: String,
  }

});

const userDB = mongoose.model("ani", user);
module.exports = userDB;