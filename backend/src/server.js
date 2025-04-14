// Import Node.js Modules

// Express = a Node.js web application framework
const express = require('express'), http = require('http');
// Mongoose = a MongoDB driver used to interact with the database
const mongoose = require('mongoose');
// Dotenv = a module that loads environment variables from .env into process.env
const dotenv = require('dotenv');
// Cors = a module that enables Cross Orgin Reseource Sharing
const cors = require('cors');
// Create server hostname/port variables, express app instance
const hostname = 'localhost';
const port = 8080;
const app = express();

// note: make sure to use dotenv.config() to load environment variables
dotenv.config();
// Enables CORS for all requests and allows server to parse JSON data
app.use(cors());
app.use(express.json());

// API endpoints
const exercises = require('./routes/exercisesAPI');
const users = require('./routes/usersAPI');
app.use('/api/exercises', exercises);
app.use('/api/users', users);

// Database Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri).then(() => {
    console.log(`SUCCESS (DATABASE CONNECTION)`);
}).catch((error) => {
    console.error(`FAILURE (DATABASE CONNECTION): ${error}`);
});

// Create HTTP server, using Express app as the request listener 
const server = http.createServer(app);

// Starts server on "port" and "hostname"
server.listen(port, hostname, () => {
    console.log(`Server Running at http:${hostname}:${port}`);
});