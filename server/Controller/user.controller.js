const getRes =(req, res)=>{
    res.json({message: `IT'S RESPONDING`})
}
const signup =(req, res)=>{
    console.log(req.body)
}
const signin=(req, res)=>{

}

module.exports = {
    getRes,
    signup,
    signin,
}