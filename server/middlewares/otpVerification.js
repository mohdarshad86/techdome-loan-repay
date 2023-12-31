const otpModel = require('../models/otpModel');
const otpGenerator = require('otp-generator');
const userModel = require('../models/userModel');
const generateToken = require('../config/generateToken');

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    let userExist = await userModel.findOne({ phone }).select({ password: 0 })

    if (!userExist) return res.status(400).json({ status: false, message: 'Invalid Credentials' })

    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    console.log(`OTP sent to ${phone}`, otp);
    let newOtp = await otpModel.findOne({ phone })
    if (newOtp) {
      await otpModel.findOneAndUpdate(newOtp._id, { $set: { otp: otp } })
    }
    else {
      const data = {
        phone: phone,
        otp: otp
      }
      await otpModel.create(data)
    }
    // send otp to mobile
    // send the OTP to the phone number using your preferred method, such as SMS or email
    res.status(200).json({ status: true, message: `OTP sent to ${phone}` });
  } catch (error) {

    return res.status(500).send({ status: false, message: error.message })
  }
};

const verifyOTP = async (req, res) => {
  try {

    const { phone, enteredOTP } = req.body;

    const getOtp = await otpModel.findOne({ phone: phone })

    let userExist = await userModel.findOne({ phone }).select({ password: 0 })

    if (!userExist) return res.status(400).json({ status: false, message: 'Invalid Credentials' })

    if (getOtp.otp === enteredOTP) {

      let user = {
        ...userExist._doc,
        token: generateToken(userExist._id)
      }

      if (userExist) {
        return res.status(200).json(user)
      }
      else {
        return res.status(400).json({ status: false, message: 'Invalid Credentials' })
      }
    } else {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
    }

  } catch (error) {

    return res.status(500).send({ status: false, message: error.message })
  }
};

module.exports = { sendOTP, verifyOTP }
