const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // format: Bearer token
    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { protect };
