const express = require('express');
const searchRouter = require('./search');
const historyRouter = require('./history');

const app = express();

app.use(express.json());
app.use('/search', searchRouter);
app.use('/history', historyRouter);

module.exports = app;
