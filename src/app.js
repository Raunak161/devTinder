const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
app.use("/", express.json()); //json to javascript object middleware
app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model
  //console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("users not found");
    } else {
      res.send(users);
    }
  } catch {
    res.status(400).send("something went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user) res.send(user);
    else res.send("user not found");
  } catch {
    res.status(400).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is successfully listening on the port 3000");
    });
  })
  .catch(() => {
    console.log("Server is not listening");
  });
