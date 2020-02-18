const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  }
},
{
  id: false,
  toJSON: { virtuals: true }
}
);

schema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'user'
});
module.exports = mongoose.model('User', schema);
