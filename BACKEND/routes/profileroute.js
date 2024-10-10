const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const {getallprofile,createprofile} = require('../controllers/profilecontroller')
const {isAuth}  = require('../Middleware/auth')

// router.use((req, res, next) => {
    
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.status(402).send({message : "Error in profileRoute"});
//       const decoded = jwt.verify(token, 'g3g3h3dwe');
//       // console.log(decoded)
//       req.user = decoded;
//     } catch (error) {
//       console.log(error)
//       res.status(400).send({message : error});
//     }
//     next();
//   })

router.route('/profile').post(isAuth,createprofile);
router.route('/getprofile').get(isAuth,getallprofile);
// router.route('/profile').post(isAuth,createprofile);
// router.route('/getprofile').get(isAuth,getallprofile);

module.exports = router