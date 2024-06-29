const rateLimit = require("express-rate-limit");
// 5 requests every 10 minutes
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 5 requests per windowMs
  message: "Too many requests",
});
module.exports = limiter;
