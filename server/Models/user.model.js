const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phoneNumber: String,
    email: String,
    accountNumber: Number,
    totalBalance: Number,
    password: String,
    profile_picture: String
})

let saltRound = 10

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassowrd)=>{
        if(err){
            console.log(err);
        }else{
             this.password = hashedPassowrd
             next()
        }
    } )
})


userSchema.methods.validatePassword = function (password, callback){
    bcrypt.compare(password, this.password, (err, same)=>{
        if(!err){
            callback(err, same)
        }else{
            next()
        }
    })
}


const userModel = mongoose.model('users_tb', userSchema)

module.exports = {userModel}