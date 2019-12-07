const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 2000,
  },
}, { timestamps: true });

module.exports = mongoose.model('Car', schema);
