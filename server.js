'use strict';
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
app.use(express.json());
const PORT = process.env.PORT || 3002;

// Test mongoose connection
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
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);


//GET POST DELETE functions
async function getBooks(req, res, next) {
  try {
    // get cat data from the database
    let results = await Books.find();
    console.log(results);
    res.status(200).send(results);
  } catch (err) {
    next(err);
  }
}

async function postBooks(req, res, next) {
  try {
    console.log(req.body);
    let createdBook = await Books.create(req.body);
    res.send(createdBook);
  } catch (err) {
    next(err);
  }
}

async function deleteBooks(req, res, next) {
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.send('book deleted');
  } catch (err) {
    next(err);
  }
}

async function putBooks(req, res, next) {
  try {
    const { title, description, status } = req.body;
    const updatedBook = await Books.findByIdAndUpdate(req.params.id, { title, description, status }, { new: true, overwrite: true });
    res.status(200).send(updatedBook);
  } catch (err) {
    next(err);
  }
}

app.get('*', (request, response,) => {
  response.status(404).send('Not available');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
