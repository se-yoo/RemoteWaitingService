const mongoose = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(mongoose);

const answerSchema = mongoose.Schema({
  participantDate: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: Number,
    default: 0
  },
  answers: {
    type: [mongoose.Schema.Types.Mixed]
  }
});


const EventAnswer = mongoose.model('EventAnswer', answerSchema);

module.exports = {EventAnswer}