const mongoose = require('mongoose');

const solution = mongoose.Schema({
  title: {type: String, required:  true},
  description: {type: String, required: true},
  testcases: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestCase'}]
});

module.exports = mongoose.model("Solution", solution);
