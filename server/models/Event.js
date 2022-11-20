const { mongoose, Schema } = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  noLimitDate: {
    type: String
  },
  optionCd: {
    type: String
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