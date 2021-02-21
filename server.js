// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Dependencies
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log('server is running');
  console.log(`running on localhost:${port}`);
};

// GET Route
app.get('/all', sendData)
function sendData (req, res) {
  res.send(projectData)
}

// POST Route
app.post('/add', addData)
function addData(req, res) {
  projectData.date = req.body.date;
  projectData.temperature = req.body.temperature;
  projectData.userResponse = req.body.userResponse;
  res.send(projectData)
};
