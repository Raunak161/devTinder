const express = require("express");
const { adminAuth } = require("./middlewares/Auth");
const app = express();

app.use("/admin", adminAuth);
app.use("/admin/getAllData", (req, res, next) => {
  res.send("This is All data");
});
app.use("/admin/getName", (req, res, next) => {
  res.send("This is Name");
});

app.listen(3000, () => {
  console.log("server is successfully listning on the port 3000");
});
