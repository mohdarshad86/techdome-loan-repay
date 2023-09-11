const router = require('express').Router()

router.all('*', (req, res) => {
    return res.status(400).send('Invalid URL')
})

module.exports = router


