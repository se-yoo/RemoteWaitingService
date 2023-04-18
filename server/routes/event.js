const express = require("express");
const router = express.Router();
const { Event } = require("../models/Event");
const { auth } = require("../middleware/auth");
const { mongoose } = require("mongoose");

router.get("/", auth, (req, res) => {
  if (req.query.eventId) {
    // 단일 검색
    const adminCondition = [
      { $match: { _id: new mongoose.Types.ObjectId(req.query.eventId) } },
      {
        $lookup: {
          from: "eventanswers",
          localField: "_id",
          foreignField: "event",
          as: "participantCnt",
        },
      },
      {
        $addFields: {
          participantCnt: { $size: "$participantCnt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "writer",
          foreignField: "_id",
          as: "writer",
        },
      },
      { $unwind: "$writer" },
      {
        $project: {
          "writer.birthDay": 0,
          "writer.email": 0,
          "writer.password": 0,
          "writer.phoneNumber": 0,
          "writer.role": 0,
          "writer.token": 0,
          "writer.tokenExp": 0,
        },
      },
    ];

    const userCondition = [
      { $match: { _id: new mongoose.Types.ObjectId(req.query.eventId) } },
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                { case: { $eq: ["$noLimitDate", true] }, then: 1 },
                { case: { $gt: ["$startDate", "$$NOW"] }, then: 0 },
                {
                  case: {
                    $and: [
                      { $lte: ["$startDate", "$$NOW"] },
                      { $gte: ["$endDate", "$$NOW"] },
                    ],
                  },
                  then: 1,
                },
                { case: { $lt: ["$endDate", "$$NOW"] }, then: 2 },
              ],
              default: undefined,
            },
          },
        },
      },
    ];

    const condition = req.user.role === 1 ? adminCondition : userCondition;

    Event.aggregate(condition, (err, event) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, event: event[0] });
    });
  } else {
    // 목록 검색
    const adminCondition = [
      { $match: { writer: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "eventanswers",
          localField: "_id",
          foreignField: "event",
          as: "participantCnt",
        },
      },
      {
        $addFields: {
          participantCnt: { $size: "$participantCnt" },
        },
      },
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                { case: { $eq: ["$noLimitDate", true] }, then: 1 },
                { case: { $gt: ["$startDate", "$$NOW"] }, then: 0 },
                {
                  case: {
                    $and: [
                      { $lte: ["$startDate", "$$NOW"] },
                      { $gte: ["$endDate", "$$NOW"] },
                    ],
                  },
                  then: 1,
                },
                { case: { $lt: ["$endDate", "$$NOW"] }, then: 2 },
              ],
              default: undefined,
            },
          },
        },
      },
      { $sort: { status: 1, createDate: -1 } },
    ];

    const userCondition = [
      {
        $lookup: {
          from: "eventanswers",
          localField: "_id",
          foreignField: "event",
          pipeline: [
            { $match: { writer: new mongoose.Types.ObjectId(req.user._id) } },
          ],
          as: "eventanswer",
        },
      },
      {
        $addFields: {
          userAnswerCnt: {
            $size: "$eventanswer",
          },
        },
      },
      { $match: { userAnswerCnt: { $gt: 0 } } },
      { $unwind: "$eventanswer" },
      {
        $addFields: {
          result: "$eventanswer.status",
        },
      },
      {
        $addFields: {
          status: {
            $switch: {
              branches: [
                { case: { $eq: ["$noLimitDate", true] }, then: 1 },
                { case: { $gt: ["$startDate", "$$NOW"] }, then: 0 },
                {
                  case: {
                    $and: [
                      { $lte: ["$startDate", "$$NOW"] },
                      { $gte: ["$endDate", "$$NOW"] },
                    ],
                  },
                  then: 1,
                },
                { case: { $lt: ["$endDate", "$$NOW"] }, then: 2 },
              ],
              default: undefined,
            },
          },
        },
      },
      { $sort: { status: 1, createDate: -1 } },
    ];

    const condition = req.user.role === 1 ? adminCondition : userCondition;

    Event.aggregate(condition, (err, events) => {
      if (err) return res.status(400).send(err);
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
  Event.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.delete("/delete", auth, (req, res) => {
  Event.findOneAndDelete({ _id: req.query.eventId }, {}, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/userEventSelect", (req, res) => {
  Event.findById(req.body.eventId, (err, item) => {
    if (!item) {
      return res.json({
        success: false,
        err,
      });
    } else {
      return res.status(200).json({
        success: true,
        event: item,
        eventQuestion: item.questions,
      });
    }
  });
});

module.exports = router;
