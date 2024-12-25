// Import Node.js Modules

// Express = a Node.js web application framework
const express = require('express'), http = require('http');
// Mongoose = a MongoDB driver used to interact with the database
const mongoose = require('mongoose');
// Dotenv = a module that loads environment variables from .env into process.env
const dotenv = require('dotenv');

// Create server hostname/port variables, express app instance
const hostname = 'localhost';
const port = 8080;
const app = express();

// note: make sure to use dotenv.config() to load environment variables
dotenv.config();
// middleware (?)
app.use(express.json());

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