const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();
const { EventAnswer } = require("../models/EventAnswer");
const { mongoose } = require("mongoose");

router.get("/", auth, (req, res) => {
  if (req.user.role === 1) {
    // 관리자(목록 검색)
    EventAnswer.find({ event: req.query.eventId })
      .populate("writer")
      .sort({ participantDate: req.query.optionCd === 0 ? -1 : 1 })
      .exec((err, eventAnswers) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, eventAnswers });
      });
  } else {
    // 사용자(참여자) (단일 검색)
    EventAnswer.aggregate(
      [
        {
          $match: {
            event: new mongoose.Types.ObjectId(req.query.eventId),
            writer: new mongoose.Types.ObjectId(req.user._id),
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

router.post("/guestCreate", (req, res) => {
  EventAnswer.findByIdAndUpdate(
    req.body.writer,
    { writer: req.body.writer },
    (err, answer) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        guestId: answer._id,
        eventId: answer.event,
      });
    },
  );
});

router.post("/create", (req, res) => {
  const answer = new EventAnswer(req.body);

  if (req.body.writer) {
    EventAnswer.findOne(
      { event: req.body.event, writer: req.body.writer },
      (err, item) => {
        if (!item) {
          answer.save((err, doc) => {
            if (err)
              return res.json({ success: false, message: "Error!", err });
            return res.status(200).json({
              success: true,
              event: answer.event,
              writer: answer.writer,
              _id: answer._id,
            });
          });
        } else {
          return res.json({
            success: false,
            message: "이미 참여한 이벤트 입니다.",
            err,
          });
        }
      },
    );
  } else {
    answer.save((err, doc) => {
      if (err) return res.json({ success: false, message: "Error!", err });
      return res.status(200).json({
        success: true,
        event: answer.event,
        writer: answer.writer,
        _id: answer._id,
      });
    });
  }
});

router.put("/update", (req, res) => {
  EventAnswer.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
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
