// node/ express server implementation on port 4000

// web framework
const express = require('express');
const app = express();

// node body parsing middleware
const bodyParser = require('body-parser');

// allows restricted resources on web page to be requested from another domain
// outside domain first resource was served
const cors = require('cors');

// add mongodb
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://124.0.0.1:27017/workouts', { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});