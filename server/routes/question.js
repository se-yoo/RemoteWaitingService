const express = require('express');
const router = express.Router();
const { EventQuestion } = require("../models/EventQuestion");

router.post("/create", (req, res) => {
  const question = new EventQuestion(req.body);

  question.save((err,doc) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true,
      options:question.options
    });
  });
});

module.exports = router;