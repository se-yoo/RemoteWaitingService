const express = require('express');
const router = express.Router();
const { Notice } = require("../models/Notice");

router.post("/write", (req, res) => {
  const notice = new Notice(req.body);

  notice.save((err,doc) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true
    });
  });
});

module.exports = router;