const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  details: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Data", productSchema);
