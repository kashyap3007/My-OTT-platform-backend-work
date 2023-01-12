const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  image: {
    data: Buffer,
  },
  category: {
    type: String,
    default: "Special",
  },
  details: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Special", productSchema);
