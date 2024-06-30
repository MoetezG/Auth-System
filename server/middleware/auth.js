const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  if (!req.headers.cookie) {
    return res.json({ status: "ko", message: "token manquant" });
  }
  const token = req.headers.cookie.split("=")[1];

  if (!token) {
    return res.json({ status: "ko", message: "token manquant" });
  }
  try {
    var decoded = jwt.verify(token, "secret_shhhht");
    if (!decoded) {
      return res.json({ status: "ko", message: "token invalide" });
    }
    req.name = decoded.name;
    req.idUser = decoded.idUser;
    next();
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = auth;
