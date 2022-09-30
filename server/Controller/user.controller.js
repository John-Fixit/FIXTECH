const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()
const getRes =(req, res)=>{
    res.json({message: `IT'S RESPONDING`})
}
const signup =(req, res)=>{
    console.log(req.body)
}
const signin=(req, res)=>{

}
const googleCallback =(req, res)=>{
    passport.use(
        new GoogleStrategy(
            {
                clientID:process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                CLIENT_URL: process.env.CLIENT_URL,
                scope: ['profile', 'email']
            },
            function(accessToken, refreshToken, profile, callback){
                callback(null, profile)
            }
        )
    )
        
    passport.serializeUser((user, done)=>{
        done(null, user)
    })

    passport.deserializeUser((user, done)=>{
        done(null, user)
    })

    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: res.send({status: false, message: `Not authenticated`})
    })
}

module.exports = {
    getRes,
    signup,
    signin,
    googleCallback
}