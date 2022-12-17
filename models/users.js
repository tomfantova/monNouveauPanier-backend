const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  token: String,
  preferences: { String },
  bookmarks: {
    interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "interviews" }],
    generalities: [{ type: mongoose.Schema.Types.ObjectId, ref: "general" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "labels" }],
  },
  lists: [
    {
      id: Number,
      name: String,
      date: String,
      active: Boolean,
      categories: [],
    },
  ],
});

const User = mongoose.model("users", usersSchema);

module.exports = User;
