const mongoose = require('mongoose');

const smileTestSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SmileTest', smileTestSchema);
