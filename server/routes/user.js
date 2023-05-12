const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ userId: req.body.userId, active: true }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "입력한 아이디에 해당하는 유저가 없습니다.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("x_authExp", user.tokenExp);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id,
            isAdmin: user.role === 1,
            isAuth: true,
          });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 1,
    isAuth: true,
    userId: req.user.userId,
    name: req.user.name,
    role: req.user.role,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    },
  );
});

router.get("/", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        birthDay: user.birthDay,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
      },
    });
  });
});

router.put("/", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, req.body, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.put("/active", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "", active: false },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    },
  );
});

module.exports = router;
