const express = require("express");

const router = express.Router();

const Model = require("../models/model");
const fs = require("fs");
const path = require("path");

// router function of express ko call kr die
//we are using Router from Express, and we are exporting it too using module.exports.

// router.get("/" , (req , res) => {
//   console.log("inside");
//   res.send("working")
// });
router.get("/home" , (req , res) => {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname , "../index.html"));
});
router.post("/post", async (req, res) => {
  try {
    // console.log(req.body);
    const file = req.files.myFile;
    const {name} = req.body;
    // console.log(req.files.name  , "Name");
    // is a buffer console.log(file.data);
    const data = new Model({
      name: req.body.name,
      image : file.data,
      details: req.body.details,
    });

    // // console.log(data);
    // const dataToSave = await data.save();
    // // console.log(dataToSave);
    res.status(201).json({name : "fello"});
  } catch (error) {
    // console.log("Galat hai");
    res.status(400).json({ message: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
    //Sends data in JSON format and ends the request
    console.log(data);
    // res.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// //Get by ID Method
router.get("/get/:id", async (req, res) => {
  try {
    //id k hisab se data dhund lega
    const data = await Model.findById(req.params.id);
    res.json(data);
    //Sends data in JSON format and ends the request
    console.log(data);
    // res.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with name ${data.name} and ${id} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
