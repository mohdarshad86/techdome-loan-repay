const router = require('express').Router()
const userController = require('../controllers/userController');
const loanController = require('../controllers/loanController');
const authorise = require('../middlewares/authMiddleware')
const otp = require('../middlewares/otpVerification');

//user
router.post('/api/user', userController.register)
router.post('/api/user/login', userController.Login)
router.get('/api/users', authorise.auth, userController.allUsers)

//otp verify
router.post('/api/user/sendOTP', otp.sendOTP)
router.post('/api/user/verifyOTP', otp.verifyOTP)

//loan
router.post('/api/loan/create', authorise.auth, loanController.createLoan)
router.put('/api/loan/approve/:loanId', authorise.auth, loanController.approveLoan)
router.post('/api/loan/repay/:loanId', authorise.auth, loanController.addRepayment)
router.get('/api/loan/user', authorise.auth, loanController.getLoansByUser)
router.get('/api/loan/allUser', authorise.auth, loanController.getAllLoans)

router.all('*', (req, res) => {
    return res.status(400).send({ message: 'Invalid URL' })
})

module.exports = router