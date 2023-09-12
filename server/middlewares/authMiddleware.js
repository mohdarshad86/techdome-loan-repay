const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')


const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            // console.log(token);

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // console.log(decoded);
            req.user = await userModel.findById(decoded.id).select('-password')
            // console.log(req.user);
            next()
        } catch (error) {
            return res.status(401).send("Not Authorised")
        }
    }
    if (!token) {
        return res.status(401).send("Not Authorised Token")
    }
}

module.exports = { auth }