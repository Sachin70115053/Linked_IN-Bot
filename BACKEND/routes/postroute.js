const router = require('express').Router()
const {savePost,createpost,getallpost}  =require('../controllers/postcontroller')
const {isAuth} = require('../Middleware/auth')

router.route('/createpost').post(isAuth,createpost)

router.route('/getallpost').get(isAuth,getallpost)

router.route('/savepost').post(isAuth,savePost)

module.exports = router;