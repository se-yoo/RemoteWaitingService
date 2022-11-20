const { mongoose, Schema } = require("mongoose");

const noticeSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  target: {
    type: Number,
    default: 0 //참여자 모두
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}, { 
  timestamps: { 
    createdAt: "createDate",
    updatedAt: "updateDate" 
  }
});


const Notice = mongoose.model('Notice', noticeSchema);

module.exports = { Notice }