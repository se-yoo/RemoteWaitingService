const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();
const { EventAnswer } = require("../models/EventAnswer");
const { mongoose } = require('mongoose');

router.get("/", auth, (req, res) => {
  if(req.user.role === 1) { // 관리자
    EventAnswer.find({ "event": req.query.eventId })
      .populate("writer")
      .sort({ participantDate: req.query.optionCd === 0 ? -1 : 1 })
      .exec((err, answers) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, answers });
      })
  } else { // 사용자(참여자)

  }
});

router.post("/create", (req, res) => {
  const answer = new EventAnswer(req.body);

  answer.save((err, doc) => {
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true,
      answers:answer.answers
    });
  });
});


router.post("/userEventListSelect",(req,res)=>{
  EventAnswer.aggregate([
    { $match:{ "writer" : new mongoose.Types.ObjectId(req.body.userId) } },
    { $lookup:
     {
       from: "events",
       localField: "event",
       foreignField: "_id",
       as: "eventDetail"
     }
    },
    { $unwind: "$eventDetail" },
    { $project:{
        _id:"$eventDetail._id", 
        title:"$eventDetail.title", 
        createDate:"$eventDetail.createDate",
         startDate:"$eventDetail.startDate",
         endDate:"$eventDetail.endDate",
         status:1
      },
    }
    
  
  ], function(err, list){
      if(err) {
        return res.json({
          success: false,
          message:"listist load를 실패했습니다.",
          err
        })
      }
      else{
        return res.status(200).json({
          success: true,
          eventList:list,
          user:req.body.userId
        })
      }
  })
})

module.exports = router;