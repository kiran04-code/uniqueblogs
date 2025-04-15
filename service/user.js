const jwt = require("jsonwebtoken");
require('dotenv').config()
const secretKey = process.env.JWT_SECRET // fixed typo: screketkey ➝ secretKey

function createToken(user) {
  const payload = {
    _id: user._id,
    username:user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

function validation(token) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
module.exports = {
  createToken,
  validation,
};
