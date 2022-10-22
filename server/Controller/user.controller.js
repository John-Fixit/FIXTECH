const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { userModel } = require("../Models/user.model");
const jwt = require('jsonwebtoken')
require("dotenv").config();
const SECRET = process.env.JWT_SECRET
const getRes = (req, res) => {
  res.json({ message: `IT'S RESPONDING` });
};

const signup = (req, res) => {
  console.log(req.body);
  userModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({
        message: `Internal sever error! please check your connection`,
        status: false,
      });
    } else {
      if (user) {
        res.json({
          message: `The Email entered has already been used`,
          status: false,
        });
      } else {
        const form = new userModel(req.body);
        form.save((err) => {
          if (err) {
            res.json({
              message: `Network error, please try again!`,
              status: false,
            });
          } else {
            res.json({ message: `User registered successfully`, status: true });
          }
        });
      }
    }
  });
};
const signin = (req, res) => {
    const password = req.body.password
    userModel.findOne({accountNumber: req.body.accountNumber}, (err, user)=>{
        if(err){
            res.json({message: `Internal server error, please check your connection!`, status: false})
            console.log(`internal server error`);
        }else{
            if(!user){
                res.json({message: `The account number was incorrect!`, status: false})
            }else{
                user.validatePassword(password, (err, same)=>{
                    if(err){
                        res.json({message: `Internal server error, please check your connection`, status: false})
                    }else{
                        if(same){
                            const token = jwt.sign({accountNumber: req.body.accountNumber}, SECRET, {expiresIn: "1h"})
                            res.json({token, status: true})
                        }else{
                            res.json({message: `Incorrect password, please check your password and try again`})
                        }
                    }
                })
            }
        }
    })

};
const googleCallback = (req, res) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        CLIENT_URL: process.env.CLIENT_URL,
        scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, callback) {
        callback(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: res.send({ status: false, message: `Not authenticated` }),
  });
};

const authorizeFunc=(req, res)=>{
  const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result)=>{
      if(err){
        res.json({message: `Internal server error! please check your connection`, status: false})
      }else{
        userModel.findOne({'accountNumber': result.accountNumber}, (err, user)=>{
          if(err){
            res.send({message: `Internal server error!`, status: false})
          }else{
            res.send({userDetail: user, status: true})  
          }
        })
      }
    })
}

module.exports = {
  getRes,
  signup,
  signin,
  googleCallback,
  authorizeFunc
};
