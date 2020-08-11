const mongoose = require('mongoose');

const solution = mongoose.Schema({
  teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true},
  question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true},
  score: {type: Number, required: true},
  code: {type: String, required: true}

});

module.exports = mongoose.model("Solution", solution);
