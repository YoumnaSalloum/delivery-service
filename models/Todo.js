const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    parcel: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
     Address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
     statuse: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);
