const router = require('express').Router()
const {createPersona,getallPersona,deletepersona,getSinglePersona,editpersona}  = require('../controllers/personacontroller')
const {isAuth} = require('../Middleware/auth')

router.route('/createpersona').post(isAuth,createPersona)
router.route('/getsinglepersona/:name').get(isAuth,getSinglePersona)
router.route('/getpersona').get(isAuth,getallPersona)
router.route('/delete/:name').get(isAuth,deletepersona)
router.route('/update_persona/:name').post(isAuth,editpersona)

module.exports = router