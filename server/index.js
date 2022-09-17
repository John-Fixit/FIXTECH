const express = require ('express')
const userRouter = require('./Routes/user.route')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { json } = require('express')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}))
app.use(json())
app.use(cors())
const PORT = process.env.PORT
app.use('/', userRouter)
// app.use('/admin')


app.listen(PORT, ()=>{
    console.log(`App is listening on port: ${PORT}`);
})