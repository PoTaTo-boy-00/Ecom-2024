const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decode = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { authMiddleware };
