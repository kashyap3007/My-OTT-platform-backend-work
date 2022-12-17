const express = require("express");

const router = express.Router();

const Model = require("../models/model");

// router function of express ko call kr die
//we are using Router from Express, and we are exporting it too using module.exports.

// router.get("/" , (req , res) => {
//   console.log("inside");
//   res.send("working")
// });

router.post("/post", async (req, res) => {
  try {
    // console.log("wtf");
    console.log(req.body);
    // console.log(req.body.name, req.body.age);
    console.log(req.files);
    const data = new Model({
      name: req.body.name,
      // image: req.body.image,
      details: req.body.details,
    });

    // console.log(data);
    const dataToSave = await data.save();
    // console.log(dataToSave);
    res.status(201).json(dataToSave);
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
