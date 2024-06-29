const express = require("express");

const router = express.Router();
router.use(express.json());
const {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
} = require("../controller/controller.js");
const auth = require("../middleware/auth.js");
const apicache = require("apicache");

let cache = apicache.middleware;

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", auth, cache("2 minutes"), getUser);
router.delete("/:id", auth, deleteUser);
router.put("/:id", auth, updateUser);
router.get("/logout", auth, logoutUser);

module.exports = router;
