const mongoose = require("mongoose");

const guidesSchema = mongoose.Schema({
  title: String,
  date: Date,
  category: String,
  images: {},
  resume: {
    subtitles: [String],
    paragraphs: [String],
  },
  main: {
    subtitles: [String],
    paragraphs: [String],
  },
});

const Guide = mongoose.model("guides", guidesSchema);

module.exports = Guide;
