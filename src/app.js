const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "virat",
    lastName: "kohli",
    emailId: "viratkohli@gmail.com",
    password: "virat@12",
  };
  //Creating a new instance of the User model
  const user = new User(userObj);
  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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
