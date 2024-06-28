const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  pass = bcrypt.hashSync(password, 10);
  const user = await User.create({ name, email, password: pass });
  if (!user) {
    return res.json({ status: "ko", message: "User not created" });
  }
  res.json({ status: "ok", user });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const token = jwt.sign(
    { name: user.name, idUser: user._id },
    "secret_shhhht",
    { expiresIn: "30d" }
  );
  res.json({ status: "ok", token });
};
const getUser = async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json({ status: "ok", users });
  }
  res.json({ status: "ko", message: err });
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.deleteOne({ _id: mongoose.Types.ObjectId(id) });
  if (!user) {
    return res.json({ status: "ko", message: "User not deleted" });
  }
  res.json({ status: "ok", user });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const user = await User.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { name, email, password }
  );
  if (!user) {
    return res.json({ status: "ko", message: err });
  }
  res.json({ status: "ok", user });
};
const logoutUser = async (req, res) => {
  res.json({ status: "ok" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
};
