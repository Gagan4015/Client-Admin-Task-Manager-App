import jwt from "jsonwebtoken";

const jwtUserAuth = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.json({ message: "No token Login Again" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
  next();
};

export default jwtUserAuth;
