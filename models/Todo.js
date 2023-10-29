// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: String,
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model('axios', todoSchema);
