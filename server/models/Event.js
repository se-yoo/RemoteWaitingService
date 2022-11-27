const { mongoose, Schema } = require("mongoose");
const { EventAnswer } = require("../models/EventAnswer");

const eventSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  questions:  [
    {
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
    }
  ],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  noLimitDate: {
    type: Boolean
  },
  optionCd: {
    type: Number
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: { 
    createdAt: "createDate",
    updatedAt: "updateDate" 
  }
});


const Event = mongoose.model('Event', eventSchema);

module.exports = { Event }