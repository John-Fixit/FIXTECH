
const express = require('express')
const userRouter = express.Router()
const userController = require('../Controller/user.controller')
const passport = require('passport')
require('dotenv').config()
userRouter.get('/', userController.getRes)
userRouter.post('/auth', userController.signup)
userRouter.post('/authLogin', userController.signin)
userRouter.get('/authorizeUser', userController.authorizeFunc)
userRouter.post('/uploadUserPicture', userController.uploadUserPicture)
module.exports = userRouter