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
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401)
    }

    const token = authHeader.split(' ')[1]
    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({msg: `Hello ${decoded.username}`, secret: `token is: ${token}`})
    } catch (err){
        throw new CustomAPIError('Not authorized to access this route', 401)
    }
}

module.exports = {
    login, dashboard
}