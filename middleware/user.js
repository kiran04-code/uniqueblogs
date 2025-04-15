const { validation } = require("../service/user");

function checkAuth(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName]; // renamed from userID to token for clarity

    if (!token) {
      return next(); // No token, move on
    }

    try {
      const userPayload = validation(token); // assuming validation returns user info
      req.user = userPayload;
    } catch (error) {
      
    }
    next();
  };
}

module.exports = { checkAuth };
