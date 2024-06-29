const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/route.js");
const cors = require("cors");
const limiter = require("./middleware/limiter.js");

app = express();
dotenv.config();
app.use(cors());
app.use(limiter);
app.set("trust proxy", 1);
app.use("/api/user", router);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running...");
    });
  })
  .catch((err) => {
    console.error(err);
  });
