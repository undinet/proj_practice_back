
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors());


mongoose.connect(process.env.DB)
.then(() => console.log("connected to database"))
.catch((err) => console.error("Failed to connect to database:", err));

module.exports = app;


/*
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors());

console.log("MongoDB URI: ", process.env.DB); // 환경 변수 확인
console.log("PORT: ", process.env.PORT); // PORT 확인

async function connectDB() {
  try {
    console.log("Attempting to connect to database...");
    await mongoose.connect(process.env.DB);
    console.log("Connected to database");
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
}

connectDB();

module.exports = app;
*/

