const express = require("express");
//const { adminAuth } = require("./middlewares/Auth");
const app = express();

// app.use("/admin", adminAuth);
// app.use("/admin/getAllData", (req, res, next) => {
//   res.send("This is All data");
// });
// app.use("/admin/getName", (req, res, next) => {
//   res.send("This is Name");
// });


app.use("/user", (req, res, next) => {
  console.log("1 handler");
  //res.send("ok")
  throw new Error("error");
  //res.send("handler 1")
  next();
});
app.use("/", (req, res, next) => {
  console.log("2 handler"); //not run
  //res.send("2 handler")
  next();
});

app.use("/", (err, req, res, next) => {
  console.log("handler3")
  if (err) {
    res.status(500).send("An error has occured");
  } else {
    res.send("3 handler");
  }
});

app.listen(3000, () => {
  console.log("server is successfully listning on the port 3000")
});
