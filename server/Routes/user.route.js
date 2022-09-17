
const express = require('express')
const userRouter = express.Router()
const userController = require('../Controller/user.controller')
userRouter.get('/', userController.getRes)
userRouter.post('/auth', userController.signup)
userRouter.post('/authLogin', userController.signin)

module.exports = userRouter