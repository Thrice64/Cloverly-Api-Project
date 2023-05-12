const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

// require in the exported router from poker.js
const history = require('./routes/history.js');
const search = require('./routes/search.js');

// add routes to our express application
// our express app will now handle requests to /poker
app.use('/history', history);
app.use('/search', search);

//connect mongoose to express
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>', { useNewUrlParser: true, useUnifiedTopology: true });


// start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
