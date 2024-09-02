// const mongoose = require("mongoose");
// const user = new mongoose.Schema({
//   userName: {
//     type: String,
//   },
//   phonNumber: {
//     type: Number,
//   },
//   email: {
//     type: String,
//   },
//   location: {
//     type: String,
//   },
//   date:{
//     type: String,
//   }

// });

// const userDB = mongoose.model("ani", user);
// module.exports = userDB;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  phonNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,  // Marked as required, if necessary
  }
});

const userDB = mongoose.model("ani", userSchema);

module.exports = userDB;


