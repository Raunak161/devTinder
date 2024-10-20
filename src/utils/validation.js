const validator = require("validator");

validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name does not exist");
  } else if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Email id is not valid");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

module.exports = {
  validateSignUpData,
};
