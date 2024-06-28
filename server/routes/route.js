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

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", auth, getUser);
router.delete("/:id", auth, deleteUser);
router.put("/:id", auth, updateUser);
router.get("/logout", auth, logoutUser);

module.exports = router;
