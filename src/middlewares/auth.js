const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAutharised = token === "xyz";
  if (isAutharised) {
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};
const userAuth = (req, res, next) => {
  const token = "abc";
  const isAutharised = token === "abc";
  if (isAutharised) {
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
