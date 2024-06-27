const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.headers.token;

  try {
    var decoded = jwt.verify(token, "secret_shhhht");
    if (!decoded) {
      return res.json({ status: "ko", message: "token invalide" });
    }
    req.name = decoded.name;
    req.idUser = decoded.idUser;
    next();
  } catch (err) {
    return res.json({ status: "ko", message: "token invalide" });
  }
}
module.exports = auth;
