const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { EventAnswer } = require("../models/EventAnswer");

router.get("/", auth, (req, res) => {
  if(req.user.role === 1) { // 관리자
    EventAnswer.find({ "event": req.query.eventId })
      .populate("writer")
      .sort({ participantDate: req.query.optionCd === 0 ? -1 : 1 })
      .exec((err, answers) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, answers });
      })
  } else { // 사용자(참여자)

  }
});

router.post("/create", (req, res) => {
  const answer = new EventAnswer(req.body);

  answer.save((err, doc) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true,
      answers:answer.answers
    });
  });
});

module.exports = router;