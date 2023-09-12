const userModel = require('../models/userModel')
const generateToken = require('../config/generateToken')
const hashPassword = require('../config/hashPassword')
const matchPassword = require('../config/matchPassword')
const validator = require("validator");

const register = async (req, res) => {
  try {
    const data = req.body
    let { name, email, password } = data

    if (!name || !email || !password)
      return res.status(400).send({ status: false, message: "Please send all the require field" })

    if (!validator.isEmail(email.trim()))
      return res.status(400).send({ status: false, message: "Please enter valid email" });

    if (password.length < 6 || password.length > 15)
      return res.status(400).send({ status: false, message: "password length must be 6 to 15" });

    const userExist = await userModel.findOne({ email: email })

    if (userExist) return res.status(400).send({ status: false, message: 'User Already exist, LogIn Please!' })

    req.body.password = password = await hashPassword(password);
    console.log(req.body.password);

    const newUser = await userModel.create(data)

    if (!newUser) {
      return res.status(400).send({ status: false, message: 'Failed to create the User' })
    }

    let user = {
      ...newUser._doc,
      token: generateToken(newUser._doc._id)
    }
    return res.status(201).json(user)
  } catch (error) {

    return res.status(500).send({ status: false, message: error.message })
  }
}

const Login = async (req, res) => {
  try {
    let data = req.body
    let { email, password } = data

    if (!validator.isEmail(email.trim()))
      return res.status(400).send({ status: false, message: "Please enter valid email" });

    if (password.length < 6 || password.length > 15)
      return res.status(400).send({ status: false, message: "password length must be 6 to 15" });

    let userExist = await userModel.findOne({ email })

    if (!userExist) return res.status(400).json({ status: false, message: 'Invalid Credentials' })

    let user = {
      ...userExist._doc,
      token: generateToken(userExist._id)
    }

    delete user.password

    if (userExist && (await matchPassword(password, userExist._doc.password))) {
      return res.status(200).json(user)
    }
    else {
      return res.status(400).json({ status: false, message: 'Invalid Credentials' })
    }

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const allUsers = async (req, res) => {
  try {

    const users = await userModel.find({ _id: { $ne: req.user._id } })

    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const getUser = async function (req, res) {
  try {
    let userId = req.params.userId;

    if (!userId)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide valid user ID" });

    let userDetails = await userModel.findById(userId);

    if (!userDetails)
      return res
        .status(404)
        .send({ status: false, msg: "No such user exists" });

    return res.status(200).send({ status: true, data: userDetails });
  } catch (error) {
    console.log("get User error", error.message);
    return res.status(500).send({ status: false, msg: error.message });
  }
};


module.exports = { register, Login, allUsers, getUser }