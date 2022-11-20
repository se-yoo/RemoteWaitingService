const { mongoose, Schema } = require("mongoose");

const answerSchema = mongoose.Schema({
  status: {
    type: Number,
    default: 0
  },
  answers: {
    type: [Schema.Types.Mixed]
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}, { 
  timestamps: { 
    createdAt: "participantDate"
  }
});

const EventAnswer = mongoose.model('EventAnswer', answerSchema);

module.exports = { EventAnswer }