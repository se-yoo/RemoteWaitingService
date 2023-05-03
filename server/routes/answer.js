const express = require("express");
const { auth_info } = require("../middleware/auth");
const router = express.Router();
const { EventAnswer } = require("../models/EventAnswer");
const { mongoose } = require("mongoose");

router.get("/", auth_info, (req, res) => {
  if (req.user && req.user.role === 1) {
    // 관리자(목록 검색)
    EventAnswer.find({ event: req.query.eventId })
      .populate("writer")
      .sort({ participantDate: req.query.optionCd === 0 ? -1 : 1 })
      .exec((err, eventAnswers) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, eventAnswers });
      });
  } else {
    if (!req.user && !req.query.answerId) {
      return res.status(401).send({
        error: "찾을 수 없음",
      });
    }

    // 사용자(참여자) (단일 검색)
    const condition = req.user
      ? { writer: new mongoose.Types.ObjectId(req.user._id) }
      : { _id: new mongoose.Types.ObjectId(req.query.answerId) };

    EventAnswer.aggregate(
      [
        {
          $match: {
            event: new mongoose.Types.ObjectId(req.query.eventId),
            ...condition,
          },
        },
        {
          $lookup: {
            from: "eventanswers",
            localField: "event",
            foreignField: "event",
            let: { participantDate: "$participantDate", status: "$status" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $gt: ["$$participantDate", "$participantDate"] },
                      { $eq: ["$$status", 0] },
                    ],
                  },
                },
              },
            ],
            as: "beforeAnswerCnt",
          },
        },
        {
          $addFields: {
            beforeAnswerCnt: { $size: "$beforeAnswerCnt" },
          },
        },
      ],
      (err, eventAnswers) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, eventAnswer: eventAnswers[0] });
      },
    );
  }
});

router.post("/create", (req, res) => {
  const eventAnswer = new EventAnswer(req.body);

  eventAnswer.save((err, eventAnswer) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, eventAnswer });
  });
});

router.put("/update", (req, res) => {
  EventAnswer.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    (err, eventAnswer) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true, eventAnswer });
    },
  );
});

router.put("/updateWin", async (req, res) => {
  const { eventId, winners } = req.body;

  await EventAnswer.updateMany({ event: eventId }, { $set: { status: 0 } });

  winners.forEach(async (winner) => {
    await EventAnswer.findOneAndUpdate({ _id: winner._id }, { status: 1 });
  });

  return res.status(200).json({
    success: true,
  });
});

module.exports = router;
