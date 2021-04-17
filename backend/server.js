const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

// const proxy = require('http-proxy-middleware')

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// add mongodb
const mongoose = require("mongoose");
let Workout = require("./model").Workout;
let Exercise = require("./model").Exercise;
const PORT = process.env.PORT || 4000;

// compress all routes
app.use(compression());

const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.use(express.static('../build/'));
// app.get("*", (req,res)=> {
// 	res.sendFile('index.html', {root: '../build/'});
// });

// setup and get the default mongoose connection
const mongoDB = process.env.MONGODB_URI || process.env.DEV_DB_CONNECTION;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//****************************************************** setup api endpoints *************************************************************************

app.use("/workouts", require("./routes/workouts"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
});
