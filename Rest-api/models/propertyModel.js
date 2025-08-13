const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  price: {
    type: Number,
    required: true,
  },
  location: String,
  rooms: Number,
  area: Number, 
  creator: {
    type: ObjectId,
    ref: 'User',
  },
  likes: [{
    type: ObjectId,
    ref: 'User',
    default: []
  }]
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
