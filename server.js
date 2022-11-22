'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Books = require('./models/BooksModel');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB);
console.log('we made it here');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongoose is connected');
});
app.get('/test', (request, response, next) => {

  response.send('test request received');

});

app.get('/book', (request, response, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
