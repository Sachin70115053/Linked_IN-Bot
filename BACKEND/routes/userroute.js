const router = require("express").Router();

const {logout,loginUser,registerUser,getSingleUser,forgotPassword,resetPassword} = require('../controllers/usercontroller')
const {is_jwt_valid} = require('../controllers/jwtTokenValid')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/getsingleuser').post(getSingleUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/password/reset/:ourtoken').post(resetPassword);
router.route('/isvalid').post(is_jwt_valid);

module.exports = router;
