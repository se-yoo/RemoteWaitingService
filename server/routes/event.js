const express = require('express');
const router = express.Router();
const { Event } = require("../models/Event");
const { auth } = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  if(req.query.eventId) { // 단일 검색
    Event.findOne({ "_id": req.query.eventId })
      .populate("writer")
      .exec((err, event) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, ...event });
      })
  } else { // 전체 검색
    Event.find()
      .populate("writer")
      .exec((err, events) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, events });
      })
  }
});

router.post("/create", auth, (req, res) => {
  const event = new User(req.body);

  event.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

router.put("/update", auth, (req, res) => {
  Event.findOneAndUpdate(
    { "_id": req.body.eventId }, 
    req.body,
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true
      });
    }
  )
});

module.exports = router;