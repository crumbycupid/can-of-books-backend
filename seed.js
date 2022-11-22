'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const BooksModel = require('./models/BooksModel');
mongoose.connect(process.env.MONGODB);

async function seed() {
  // const BooksModel = new Schema({
  //   title: { type: String, required: true },
  //   description: { type: String, required: true },
  //   status: { type: String, required: true },
  // });

  await BooksModel.create({
    title: 'Harry Potter',
    description: 'mid honestly',
    status: 'read',
  });

  await BooksModel.create({
    title: 'Cats Cradle',
    description: 'end of the world + cats',
    status: 'read',
  });

  await BooksModel.create({
    title: 'Lord of the Rings',
    description: 'small man goes for a walk',
    status: 'read',
  });

  mongoose.disconnect();
}

seed();
