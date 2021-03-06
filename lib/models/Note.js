const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
  }
});

module.exports = mongoose.model('Note', schema);
