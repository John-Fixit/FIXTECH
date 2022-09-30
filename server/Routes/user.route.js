
const express = require('express')
const userRouter = express.Router()
const userController = require('../Controller/user.controller')
const passport = require('passport')
require('dotenv').config()
userRouter.get('/', userController.getRes)
userRouter.post('/auth', userController.signup)
userRouter.post('/authLogin', userController.signin)
userRouter.get('/google/callback', passport.authenticate('google', {successRedirect: process.env.CLIENT_URL, failureRedirect: '/login'}))
module.exports = userRouter