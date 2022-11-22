'use strict';

require(dotenv).config();
const mongoose = require('mongoose');
const BooksModel = require('./models/BooksModel');
mongoose.connect(process.env.MONGOOSEDB);

async function seed() {
  const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
  });

  await bookSchema.create();

  mongoose.disconnect();
}

seed();
