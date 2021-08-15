const User = require("../model/User");

const router = require("express").Router();

require("../model/User");
router.post("/register", async (req, res) => {
  // const newuser = new User(req.body);
  // try {
  //   const data = await newuser.save();
  //   res.status(200).json(data.username);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(500).json({ error: "Enter All Fields" });
  }
  try {
    const emailexist = await User.findOne({ email: email });
    if (emailexist) {
      return res.status(500).json({ error: "Email already exist" });
    }
    const user = new User({ username, email, password });
    await user.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const newuser = new User(req.body);
  if (!newuser.email || !newuser.password) {
    return res.status(500).json("Incorrect info");
  }
  try {
    const user = await User.findOne({ email: newuser.email });
    if (user) {
      if (user.password === newuser.password) {
        res.status(200).json(user.username);
      } else {
        return res.status(500).json("Wrong password");
      }
    } else {
      return res.status(500).json("user not found in data base");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
