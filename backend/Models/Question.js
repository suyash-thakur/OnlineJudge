const mongoose = require('mongoose');

const question = mongoose.Schema({
  title: {type: String, required:  true},
  description: {type: String, required: true},
  testcases: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestCase'}]
});

module.exports = mongoose.model("Question", question);
