const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  token: String,
  preferences: {
    type: Number,
  },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guides",
    },
  ],
  lists: [],
});

const User = mongoose.model("users", usersSchema);

module.exports = User;
