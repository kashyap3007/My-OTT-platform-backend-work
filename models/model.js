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
  details: {
    required: true,
    type: String,
  },
});

// console.log(productSchema);
module.exports = mongoose.model("Data", productSchema);
// console.log(mongoose.model);
