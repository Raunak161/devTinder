const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const { validateSignUpData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const app = express();

app.use("/", express.json()); //json to javascript object middleware

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    req.body.password = passwordHash;
    const user = new User(req.body);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send(err.message);
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

app.patch("/patch/:userId", async (req, res) => {
  try {
    const id = req.params?.userId;
    const data = req.body;
    const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "skills"];
    const check = (key) => {
      return ALLOWED_UPDATES.includes(key);
    };
    const isUpdateAllowed = Object.keys(data).every(check);
    if (!isUpdateAllowed) res.status(400).send("update not allowed");
    const updatedData = await User.findByIdAndUpdate({ _id: id }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(updatedData);
  } catch (err) {
    res.status(400).send(err.message);
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
