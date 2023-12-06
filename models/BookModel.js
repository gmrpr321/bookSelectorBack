const mongoose = require("mongoose");

const BookModel = mongoose.Schema({
  bookTitle: {
    type: String,
    index: true,
    default: 0,
  },
  xParam: {
    type: Number,
    required: true,
    default: 0,
  },
  yParam: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("BookModel", BookModel);
