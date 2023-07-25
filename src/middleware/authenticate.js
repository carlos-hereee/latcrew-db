const jwt = require("jsonwebtoken");
const { accessTokenSecret, cookieName } = require("../../config.env");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  console.log("authorization", authorization);
  if (!authorization) {
    // no authorization header
    return res.status(400).json({ message: "you need a token authorization" });
  }
  const token = authorization.split(" ")[1];
  if (token === "null" || token === null) {
    return res.status(401).json({ message: "you shall not pass!" });
  } else {
    req.user = jwt.verify(token, accessTokenSecret, (err, _) => {
      if (err) {
        // TODO: handle err for expired token
        res.clearCookie(cookieName);
      }
    });
    next();
  }
};
