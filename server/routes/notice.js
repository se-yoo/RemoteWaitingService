const express = require('express');
const router = express.Router();
const { Notice } = require("../models/Notice");
const { auth } = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  if(req.user.role === 1) { // 관리자
    Notice.find({ "event": req.query.eventId })
      .sort({ createDate: -1 })
      .exec((err, notices) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, notices });
      })
  } else { // 사용자(참여자)
    Notice.find({ 
        "event": req.query.eventId, 
        "target": { $in: [0, req.query.target]} 
      })
      .sort({ createDate: -1 })
      .exec((err, notices) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, notices });
      })
  }
});

router.post("/create", (req, res) => {
  const notice = new Notice(req.body);

  notice.save((err, doc) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.put("/update", auth, (req, res) => {
  Notice.findOneAndUpdate(
    { "_id": req.body._id }, 
    req.body,
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  )
});

module.exports = router;