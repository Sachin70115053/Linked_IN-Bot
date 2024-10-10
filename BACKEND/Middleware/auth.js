const jwt = require("jsonwebtoken");
// const { isAfter } = require("validator");
// const User = require("../models/userModel");

exports.isAuth = (req, res, next) => {
  try {
    var token = req.cookies.token;
    // console.log(req.cookies.token);
    if(token == null){
      var token = req.headers['authorization'];
      if(token == null){
        token = req.body.headers['Authorization']
      }
    }

    if (!token) {
      return res.status(403).send({ message: 'No token provided' });
    }

    
    const decoded = jwt.verify(token, 'g3g3h3dwe');

    req.user = decoded;
    next();
} catch (error) {
  res.status(400).send({message : error});
}
};


// exports.isAuthenticatedUser = (async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     console.error("Please Login to access this resource");
//   }

//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = await User.findById(decodedData.id);

//   next();
// });


// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };