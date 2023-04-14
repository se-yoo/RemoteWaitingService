const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { EventAnswer } = require("../models/EventAnswer");
const { mongoose } = require('mongoose');

router.get("/", auth, (req, res) => {
  if (req.user.role === 1) { // 관리자
    EventAnswer.find({ "event": req.query.eventId })
      .populate("writer")
      .sort({ participantDate: req.query.optionCd === 0 ? -1 : 1 })
      .exec((err, answers) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, answers });
      })
  } else { // 사용자(참여자)

  }
});

router.post("/guestCreate", (req, res) => {
  EventAnswer.findByIdAndUpdate(req.body.writer, { "writer": req.body.writer },
    (err, answer) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        guestId: answer._id,
        eventId: answer.event
      });
    })
})

router.post("/create", (req, res) => {
  const answer = new EventAnswer(req.body);

  if (req.body.writer) {
    EventAnswer.findOne({ event: req.body.event, writer: req.body.writer },
      (err, item) => {
        if (!item) {
          answer.save((err, doc) => {
            if (err) return res.json({ success: false, message: "Error!", err });
            return res.status(200).json({
              success: true,
              event: answer.event,
              writer: answer.writer,
              _id: answer._id
            });
          });
        }
        else {
          return res.json({
            success: false,
            message: "이미 참여한 이벤트 입니다.",
            err
          })
        }
      })
  }
  else {
    answer.save((err, doc) => {
      if (err) return res.json({ success: false, message: "Error!", err });
      return res.status(200).json({
        success: true,
        event: answer.event,
        writer: answer.writer,
        _id: answer._id
      });
    });
  }



});

router.put("/update", (req, res) => {
  EventAnswer.findOneAndUpdate(
    { "_id": req.body._id },
    req.body,
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  )
});

router.put("/updateWin", async (req, res) => {
  const { eventId, winners } = req.body;

  await EventAnswer.updateMany({ "event": eventId }, { "$set": { "status": 0 } });

  winners.forEach(async winner => {
    await EventAnswer.findOneAndUpdate({ "_id": winner._id }, { "status": 1 });
  });

  return res.status(200).json({
    success: true
  });
});



router.post("/AnswerRowNum", (req, res) => {
  EventAnswer.aggregate([
    { $match: { "event": new mongoose.Types.ObjectId(req.body.eventId) } },
    {
      $project: {
        _id: 1,
        status: 1
      }
    },
    {
      $setWindowFields: {
        sortBy: { participantDate: -1 },
        output: { rowNum: { $documentNumber: {} } }
      }
    }
  ], function (err, list) {
    if (err) {
      return res.json({
        success: false,
        message: "list load를 실패했습니다.",
        err
      })
    }
    else {
      return res.status(200).json({
        success: true,
        eventList: list
      })
    }
  })
})

router.post("/userAnswerSelect", (req, res) => {
  EventAnswer.aggregate([
    { $match: { "writer": new mongoose.Types.ObjectId(req.body.userId), "event": new mongoose.Types.ObjectId(req.body.eventId) } },
    {
      $lookup:
      {
        from: "events",
        localField: "event",
        foreignField: "_id",
        as: "eventDetail"
      }
    },
    { $limit: 1 },
    { $unwind: "$eventDetail" },
    {
      $project: {
        questions: "$eventDetail.questions",
        createDate: "$eventDetail.createDate",
        startDate: "$eventDetail.startDate",
        endDate: "$eventDetail.endDate",
        option: "$eventDetail.optionCd",
        eventId: "$eventDetail._id",
        participantDate: 1,
        answers: 1,
        status: 1
      }
    }

  ], function (err, list) {
    if (err) {
      return res.json({
        success: false,
        message: "list load를 실패했습니다.",
        err
      })
    }
    else {
      return res.status(200).json({
        success: true,
        eventDetail: list
      })
    }
  })
})

module.exports = router;