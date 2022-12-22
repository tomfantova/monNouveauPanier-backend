const mongoose = require("mongoose");

const preferencesSchema = mongoose.Schema({
    type: Number,
    dietetique: Number,
    bilan: Number,
    ethique: Number,
    local: Number,
    agriculture: Number,    
})

const itemSchema = mongoose.Schema({
    name: String,
    active: Boolean,
})

const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    items: [itemSchema],
})

const listSchema = mongoose.Schema({
    name: String,
    date: String,
    active: Boolean,
    categories: [categorySchema],
  })

const usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  token: String,
  date: Date,
  preferences: preferencesSchema,
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "guides" }],
  lists: [listSchema]
});

const User = mongoose.model("users", usersSchema);

module.exports = User;