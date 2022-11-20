const express = require('express');
const router = express.Router();
const { EventAnswer } = require("../models/EventAnswer");

router.post("/create", (req, res) => {
  const answer = new EventAnswer(req.body);

  answer.save((err,doc) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true,
      answers:answer.answers
    });
  });
});

module.exports = router;