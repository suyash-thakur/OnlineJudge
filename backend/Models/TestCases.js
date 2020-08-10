const mongoose = require('mongoose');

const testCase = mongoose.Schema({
  description: {type: String, require: true},
  input: {type: String},
  output: {type: String, require: true},
  question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
});

module.exports = mongoose.model("TestCase", testCase);
