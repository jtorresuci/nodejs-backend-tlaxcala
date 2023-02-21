const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;
const yelpKey = process.env.YELP_KEY;


mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas database');
});
const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.get('/reviews', (req, res) => {
  const apiUrl = 'https://api.yelp.com/v3/businesses/tlaxcala-bakery-panaderia-santa-ana/reviews';
  request(
    {
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${yelpKey}`,
        'Content-Type': 'application/json',
      },
    },
    (error, response, body) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(body);
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CORS proxy server running on port ${PORT}`);
});
