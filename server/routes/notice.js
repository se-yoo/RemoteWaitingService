const express = require("express");
const router = express.Router();
const { Notice } = require("../models/Notice");
const { auth, auth_info } = require("../middleware/auth");
const { EventAnswer } = require("../models/EventAnswer");
const send_message = require("../utils/send");

router.get("/", auth_info, (req, res) => {
  if (req.user && req.user.role === 1) {
    // 관리자
    Notice.find({ event: req.query.eventId })
      .sort({ createDate: -1 })
      .exec((err, notices) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, notices });
      });
  } else {
    // 사용자(참여자)
    let target = [0];

    switch (Number(req.query.status)) {
      case 1:
      case 2:
        target.push(1);
        break;
      case 0:
      case 3:
        target.push(2);
        break;
    }

    Notice.find({
      event: req.query.eventId,
      target: { $in: target },
    })
      .sort({ createDate: -1 })
      .exec((err, notices) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, notices });
      });
  }
});

router.post("/", (req, res) => {
  const notice = new Notice(req.body.notice);

  notice.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    if (req.body.phoneNumberIndex >= 0) {
      let targetStatus = [0, 1, 2, 3];

      if (doc.target == 1) {
        targetStatus = [1, 2];
      } else if (doc.target == 2) {
        targetStatus = [0, 3];
      }

      EventAnswer.find({
        event: doc.event,
        status: { $in: targetStatus },
      }).exec(async (err2, answers) => {
        if (err2) return res.json({ success: false, err: err2 });
        const result = answers.map(
          (answer) => answer.answers[req.body.phoneNumberIndex],
        );

        if (result.length > 0) {
          const content = `[웨잇] 참여 이벤트 공지사항 알림\n제목:${doc.title}`;
          await send_message(result, content);
          return res.status(200).json({ success: true });
        } else {
          return res.status(200).json({ success: true });
        }
      });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.put("/", auth, (req, res) => {
  Notice.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.delete("/", auth, (req, res) => {
  Notice.findOneAndDelete({ _id: req.query.noticeId }, {}, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
