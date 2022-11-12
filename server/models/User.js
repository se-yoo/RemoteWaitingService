const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds=10;
const jwt=require('jsonwebtoken');

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        trim: true,
        unique: 1 
    },
    password: {
        type: String,
        minlength: 10
    },
    name: {
        type: String,
        maxlength: 50
    },
    birthDay: {
        type: Date
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    role : {
        type: Number,
        default: 0 
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
});

userSchema.pre('save',function(next){

    var user = this;

    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password=hash
                next()
            })
        })
    }
    else{
        next()
    }
})

userSchema.methods.comparePassword=function(plainPassword,cb){

    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err)
        cb(null,isMatch)    
    })

}

userSchema.methods.generateToken=function(cb){

    var user = this;

    var token = jwt.sign(user._id.toHexString(),'waitToken')

    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })


}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰 디코드
    jwt.verify(token, 'waitToken' , function(err, decoded){
        //유저 아이디를 이용해 유저를 찾은 후 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token":token}, function(err, user){
            if(err) return cb(err)
            cb(null,user)
        })
        
    })
}


const User = mongoose.model('User', userSchema);

module.exports = { User }