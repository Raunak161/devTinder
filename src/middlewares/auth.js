const jwt = require('jsonwebtoken');
const User = require("../models/user");
const privateKey = "xyz123";
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) throw new Error("Please login");
    const {_id} = await jwt.verify(token, privateKey);
    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");
    req.user=user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports= {
  userAuth,
};
