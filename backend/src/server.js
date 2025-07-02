const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

const exercises = require('./routes/exercisesAPI');
const users = require('./routes/usersAPI');
const workouts = require('./routes/workoutAPI');

app.use('/api/exercises', exercises);
app.use('/api/users', users);
app.use('/api/workouts', workouts);

// ✅ Add this for basic route check
app.get('/', (req, res) => {
  res.send('API is running');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('SUCCESS (DATABASE CONNECTION)'))
  .catch((error) => console.error(`FAILURE (DATABASE CONNECTION): ${error}`));

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
