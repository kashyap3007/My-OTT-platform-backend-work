const express = require("express");

const router = express.Router();

const Model = require("../models/model");

// router function of express ko call kr die
//we are using Router from Express, and we are exporting it too using module.exports.

router.get("/" , (req , res) => {
  console.log("inside");
  res.send("working")
});
router.post("/post", async (req, res) => {
  try {
    console.log("wtf");
    console.log(req.body);
    console.log(req.body.name , req.body.age);
    const data = new Model({
      name: req.body.name,
      age: req.body.age,
    });
    // console.log(data);
    const dataToSave = await data.save();
    console.log(dataToSave);
    res.status(201).json(dataToSave);
  } catch (error) {
    // console.log("Galat hai");
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
