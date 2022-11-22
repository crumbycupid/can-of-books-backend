'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

//new book schema to be made for backend
const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});


const BooksModel  = mongoose.model('Book', bookSchema);

module.exports = BooksModel;
