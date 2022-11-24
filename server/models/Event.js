const { mongoose, Schema } = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
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