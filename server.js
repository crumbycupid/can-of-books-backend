'use strict';
//requires
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Books schema
const Books = require('./models/BooksModel');
const verifyUser = require('./auth/auth.js');

// middleware
const app = express();
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

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);


//GET POST DELETE functions
async function getBooks(req, res) {
  // verify who the user is before letting them make their request
  verifyUser(req, async (err, user) => {
    if (err) {
      console.log(err);
      res.send('invalid token');
    } else {

      try {
        const booksFromDb = await Books.find({email: user.email});
        if (booksFromDb.length > 0) {
          res.status(200).send(booksFromDb);
        } else {
          res.status(404).send('error');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }

    }
  });
}

async function postBooks(req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.log(err);
      res.send('invalid token');
    } else {
      console.log(req.body);
      try {
        let createdBook = await Books.create({ email: user.email, ...req.body});
        res.send(createdBook);
      } catch (err) {
        next(err);
      }

    }
  });
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
