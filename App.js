const express = require("express");
const mongoose = require("mongoose");

const app = express();
const pinroute = require("./Routes/pins");
const userroute = require("./Routes/users");
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://adarsh:adarsh@cluster0.vxmi3.mongodb.net/pin?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("mongodb in connecteed");
  })
  .catch((e) => console.log(e));

app.use("/", userroute);
app.use("/", pinroute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("pathfinder/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pathfinder', 'build', 'index.html'));
});
}

app.listen(PORT, (req, res) => {
  console.log("running");
});
