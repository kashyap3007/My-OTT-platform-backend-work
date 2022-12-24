const express = require("express");

const router = express.Router();

const User = require("../models/user");

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Patch
router.patch("/update/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user.password != req.body.password) {
      res.status(400).json(" Sorry! Wrong Password!......");
    } else {
      if (req.body.image) {
        const file = req.files.image.data;
        const { password, ...others } = req.body;
        //   console.log(others);
        const updatedData = others;
        const id = req.params.id;

        const options = { new: true };
        const result = await User.findByIdAndUpdate(
          id,
          { ...updatedData, image: file },
          options
        );
        res.send(result);
      } else {
        const { password, ...others } = req.body;
        //   console.log(others);
        const updatedData = others;
        const id = req.params.id;

        const options = { new: true };
        const result = await User.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    res.send(
      `${data.fullname} with username ${data.username} has been deleted........`
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
