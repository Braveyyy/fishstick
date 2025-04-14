const express = require('express');
const router = express.Router();
const request = require('request');

// Route: Get exercises for a specific muscle
router.get('/:muscle', async (req, res) => {
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

  module.exports = router;