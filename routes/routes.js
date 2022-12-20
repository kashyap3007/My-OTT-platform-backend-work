const express = require("express");

const router = express.Router();

const Model = require("../models/model");
const fs = require("fs");
const path = require("path");

// console.log(Model);
// router function of express ko call kr die
//we are using Router from Express, and we are exporting it too using module.exports.

// router.get("/", (req, res) => {
//   console.log("inside");
//   res.send("working");
// });

// router.get("/home", (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, "../index.html"));
// });
// router.get("/image", async (req, res) => {
//   try {
//     Model.findById("639e10b1b9b726f8f524069e", (err, data) => {
//       const src = `data:image/png;base64,${Buffer.from(
//         data.image.data
//       ).toString("base64")}`;
//       console.log("returning ");
//       return res.json({ src });
//     });
//   } catch (err) {
//     console.log(err);
//   }
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

    // console.log(Model);
    // console.log(data);
    // console.log("Never ever come again in my life");
    const dataToSave = await data.save();
    // console.log(dataToSave);
    res.status(200).json(data);
  } catch (error) {
    // console.log("Galat hai");
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
      // src , name and details bhej do
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
    // console.log("inside");
    data = await data.map((info) => {
      const src = `data:image/png;base64,${Buffer.from(
        info.image.data
      ).toString("base64")}`;
      // src , name and details bhej do
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
