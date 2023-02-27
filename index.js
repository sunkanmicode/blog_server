const express = require("express");
const app = express();
const PORT = 8080;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

//initiating dotenv
dotenv.config();
app.use(express.json());

app.use("/api/auth", authRoute);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log(`connected to database ${PORT}`);
  app.listen(PORT);
});
