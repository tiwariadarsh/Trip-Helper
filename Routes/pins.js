const Pin = require("../model/Pin");

const router = require("express").Router();
require("../model/Pin");

//pin creating in in DB
router.post("/pins", async (req, res) => {
  const data = new Pin(req.body);
  try {
    const newpin = await data.save();
    res.status(200).json(newpin);
  } catch (error) {
    res.status(500).json(error);
  }
});

//getting All created Pins
router.get("/pins", async (req, res) => {
  try {
    const data = await Pin.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
