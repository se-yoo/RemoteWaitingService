const mongoose = require('mongoose');

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
  ]
});

const EventQuestion = mongoose.model('EventQuestion', questionSchema);

module.exports = {EventQuestion}