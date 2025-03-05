// Import Node.js Modules

// Express = a Node.js web application framework
const express = require('express'), http = require('http');
// Mongoose = a MongoDB driver used to interact with the database
const mongoose = require('mongoose');
// Dotenv = a module that loads environment variables from .env into process.env
const dotenv = require('dotenv');

const cors = require('cors');
const request = require('request');
// Create server hostname/port variables, express app instance
const hostname = 'localhost';
const port = 8080;
const app = express();

// note: make sure to use dotenv.config() to load environment variables
dotenv.config();
// middleware (?)
app.use(cors());
app.use(express.json());

// Route: Get exercises for a specific muscle
app.get('/api/exercises/:muscle', (req, res) => {
    const muscle = req.params.muscle;
    const apiKey = process.env.EXERCISE_API_KEY;
    const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
  
    request.get(
      {
        url,
        headers: {
          'X-Api-Key': apiKey
        }
      },
      (error, response, body) => {
        if (error) {
          console.error('Request failed:', error);
          return res.status(500).json({ error: 'Request failed' });
        } 
        else if (response.statusCode !== 200) {
          console.error('Error:', response.statusCode, body);
          return res.status(response.statusCode).json({ error: body.toString('utf8') });
        } 
        else {
          try {
            const data = JSON.parse(body);
            return res.json(data);
          } 
          catch (parseError) {
            console.error('Parse error:', parseError);
            return res.status(500).json({ error: 'Error parsing API response' });
          }
        }
      }
    );
  });
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