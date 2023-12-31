const CustomAPIError = require('../errors/custom-error')
const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        throw new CustomAPIError('Please provide email and password', 400)
    }

    // demo id
    const id = new Date().getDate()
    const token = jwt.sign({id, username},process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({msg: `User created`, token})
}

const dashboard = async (req, res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100)
    return res.status(200).json({msg: `Hello ${req.user.username}`, secret: `Here is authorized data. your lucky number is: ${luckyNumber}`})
}

module.exports = {
    login, dashboard
}