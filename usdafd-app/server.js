require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8888;

// require in our database functionality
const mongo = require('./db');

// require in the exported router from search.js
const history = require('./routes/history.js');
const search = require('./routes/search.js');

app.use(cors());
app.use(express.json());

// add routes to our express application
// our express app will now handle requests to /search
app.use('/history', history);
app.use('/search', search);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});
