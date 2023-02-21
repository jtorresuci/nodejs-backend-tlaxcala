require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();


// Enable CORS
app.use(cors());

// Set up the MongoDB connection
const mongoUri = process.env.DATABASE_URL;
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB database
client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to MongoDB database');

  const db = client.db('myfirstdatabase');
  const collection = db.collection('yelp_reviews');

  // Define an API endpoint to get the five-star reviews
  app.get('/reviews', async (req, res) => {
    try {
      // Find the five-star reviews from the database
      const fiveStarReviews = await collection.find({ rating: 5 }).toArray();

      // Return the five-star reviews as the response
      res.json({ reviews: fiveStarReviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
