const express = require("express");

const router = express.Router();

const Model = require("../models/model");
const fs = require("fs");
const path = require("path");

// console.log(Model);
//we are using Router from Express, and we are exporting it too using module.exports.

// router.get("/home", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, "../index.html"));
// });


router.post("/post", async (req, res) => {
  try {
    // console.log(req.body);
    const file = req.files.image;
    // console.log(file.data);
    // const { name } = req.body;
    // console.log(req.files.name, "image");
    // is a buffer console.log(file.data);
    const data = new Model({
      name: req.body.name,
      image: {
        data: file.data,
        contentType: "image/png/jpg/jpeg",
      },
      details: req.body.details,
    });

    const dataToSave = await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/start/get", async (req, res) => {
  try {
    let data = await Model.find().limit(3);
    // console.log("inside");
    data = await data.map((info) => {
      const src = `data:image/png;base64,${Buffer.from(
        info.image.data
      ).toString("base64")}`;
      return { src, name: info.name, details: info.details };
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    let data = await Model.find();
    data = await data.map((info) => {
      const src = `data:image/png;base64,${Buffer.from(
        info.image.data
      ).toString("base64")}`;
      return { src, name: info.name, details: info.details };
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// //Get by ID Method
router.get("/get/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
    //Sends data in JSON format and ends the request
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
