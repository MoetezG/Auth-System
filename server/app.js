const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/route.js");
const cors = require("cors");
const limiter = require("./middleware/limiter.js");
const { errorHandler, notFound } = require("./middleware/errotHandler.js");
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set("trust proxy", 1);
app.use("/api/user", router);

app.use(limiter);
app.use(notFound);
app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running...");
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
