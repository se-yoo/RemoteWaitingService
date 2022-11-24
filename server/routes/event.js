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
  } else { // 목록 검색
    const adminCondition = [
      { $match: { writer: req.user._id } },
      { $lookup: {
          from: "eventanswers",
          localField: "_id",
          foreignField: "event",
          as: "participantCnt"
      }},
      { $addFields: { 
          participantCnt: { $size: "$participantCnt" }
      }},
      { $addFields: { 
          status: {
            $switch: {
              branches: [
                { case: { $eq: ["$noLimitDate", true] }, then: 1 },
                { case: { $gt: ["$startDate", "$$NOW"] }, then: 0 },
                { case: { $and: [
                  { $lte: ["$startDate", "$$NOW"] },
                  { $gte: ["$endDate", "$$NOW" ] }
                ] }, then: 1 },
                { case: { $lt: ["$endDate", "$$NOW" ] }, then: 2 }
              ],
              default: undefined
            }
          }
      }},
      { $sort: { status: 1, createDate: -1 } }
    ];

    const userCondition = [];

    const condition = req.user.role === 1 ? adminCondition : userCondition;

    Event.aggregate(condition, (err, events) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, events });
    });
  }
});

router.post("/create", auth, (req, res) => {
  const event = new Event(req.body);

  event.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.put("/update", auth, (req, res) => {
  Event.findOneAndUpdate(
    { "_id": req.body.eventId }, 
    req.body,
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  )
});

module.exports = router;