const {run_gemini} = require('../controllers/gemnirequest')
const router = require('express').Router()
const {isAuth} = require('../Middleware/auth')


router.route('/gemni').post(isAuth,run_gemini);

module.exports = router