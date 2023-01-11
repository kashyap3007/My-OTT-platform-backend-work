const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  image: {
    data: Buffer,
    // min: 20,
    // max: 200,
  },
  details: {
    required: true,
    type: String,
  },
});

// console.log(productSchema);
module.exports = mongoose.model("Data", productSchema);
module.exports = mongoose.model("Sports", productSchema);
// console.log(mongoose.model);
