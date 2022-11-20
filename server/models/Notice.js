const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  target: {
    type: Number,
    default: 0 //참여자 모두
  }
});


const Notice = mongoose.model('Notice', noticeSchema);

module.exports = {Notice}