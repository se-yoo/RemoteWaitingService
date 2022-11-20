const { mongoose, Schema } = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String
  },
  required: {
    type: Boolean
  },
  answerType: {
    type: Number
  },
  options: [
    {
      text:{
        type: String
      },
      value:{
        type: Number
      }
    }
  ],
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
});

const EventQuestion = mongoose.model('EventQuestion', questionSchema);

module.exports = { EventQuestion }