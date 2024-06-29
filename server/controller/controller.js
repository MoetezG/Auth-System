const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let pass = bcrypt.hashSync(password, 10);
  const user = await User.create({ name, email, password: pass });
  if (!user) {
    return res.json({ status: "ko", message: "User not created" });
  }
  res.json({ status: "ok", user });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: "ko", message: "User not found" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.json({ status: "ko", message: "Password not valid" });
  }
  const token = jwt.sign(
    { name: user.name, idUser: user._id },
    "secret_shhhht",
    { expiresIn: "30d" }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({ status: "ok", user });
};
const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "ko", message: err });
  }
  res.json({ status: "ok", user });
};
const getUser = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    return res.json({ status: "ko", message: err });
  }
  res.json({ status: "ok", users });
};

const deleteUser = async (req, res) => {
  const user = await User.deleteOne({ _id: id });
  const id = req.params.id;
  if (!user) {
    return res.json({ status: "ko", message: err });
  }
  res.json({ status: "ok", user });
};

const updateUser = async (req, res) => {
  const { id } = req.params.id;
  const { name, email, password } = req.body;
  const user = await User.updateOne({ _id: id }, { name, email, password });
  if (!user) {
    return res.json({ status: "ko", message: err });
  }
  res.json({ status: "ok", user });
};
const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ status: "ok", message: "Cookie cleared" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  logoutUser,
};
