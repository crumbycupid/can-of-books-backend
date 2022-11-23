'use strict';
//console.log
//requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Mongoose
const mongoose = require('mongoose');

//Books schema
const Books = require('./models/BooksModel');
const app = express();

// middleware
app.use(cors());

const PORT = process.env.PORT || 3002;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongoose is connected');
});

mongoose.connect(process.env.MONGODB);

//Routs
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books:id', deleteBooks);

async function getBooks(req, res, next) {
  try {
    // get cat data from the database
    let results = await Books.find();
    console.log(results);
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

async function postBooks(req, res, next) {
  try {
    let createdBook = await Books.create(req.body);
    res.send(createdBook);
  } catch(err) {
    next(err);
  }
}

async function deleteBooks(req, res, next){
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.send('book deleted');
  }catch(err){
    next(err)
  }
}

app.get('*', (request, response,) => {
  response.status(404).send('Not available');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
