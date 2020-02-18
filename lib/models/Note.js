const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' }
});

module.exports = mongoose.model('Note', schema);
