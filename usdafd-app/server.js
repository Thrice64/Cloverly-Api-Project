const express = require('express');

const app = express();
const port = 8888;

// require in out database functionality
const mongo = require('./db');

// require in the exported router from poker.js
const history = require('./routes/history.js');
const search = require('./routes/search.js');

// add routes to our express application
// our express app will now handle requests to /poker
app.use('/history', history);
app.use('/search', search);

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    await mongo.connect();
});