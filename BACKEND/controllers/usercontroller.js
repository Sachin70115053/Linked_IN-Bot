
const User = require("../model/usermodel");
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendemail')
// const sendToken = require("../utils/jwtToken");

const crypto = require("crypto");

// Register a User
exports.registerUser = (async (req, res, next) => {
  const { name, email, password } = req.body;
  const found_user = await User.findOne({email : email});
  if(found_user== null){
    const user = await User.create({
      name,
      email,
      password,
    });
    res.status(200).send({message : "Created a new entry for user"})
  }else{
    res.status(400).send({message : "Already exists"})

  }
});

// Login User
exports.loginUser = async (req, res) => {
  const { name,email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Invalid username or password');
  }
  const user = await User.findOne({ email }).select("+password");
  try {

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).send("Invalid email or password");
    }

    let token = jwt.sign({ id: user._id }, 'g3g3h3dwe', {expiresIn: "1h",});


    const options = {
      expires: new Date(Date.now() + 3600000), // 1 hour in milliseconds
      httpOnly: true,
    };
  
    res.status(200).cookie('token', token, options).json({
      success: true,
      user,
      token,
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({
      error : error 
    });
  }
};



// exports.loginUser = (async (req, res, next) => {
//   const { email, password } = req.body;

//   // checking if user has given password and email both

//   if (!email || !password) {
//     return next(new ErrorHander("Please Enter Email & Password", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return next(new ErrorHander("Invalid email or password", 401));
//   }

//   const isPasswordMatched = await user.comparePassword(password);

//   if (!isPasswordMatched) {
//     return next(new ErrorHander("Invalid email or password", 401));
//   }

//   sendToken(user, 200, res);
// });

// Logout User
exports.logout = (async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = (async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return (res.status(404).send({message : "User not found"}))
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:3001/passwordreset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return (res.status(500).send({message : error}))
  }
});

// Reset password
exports.resetPassword = (async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.ourtoken)
    .digest("hex");
    
  console.log(req.params.ourtoken)
  console.log(resetPasswordToken)
  
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log("user found " , user)

  if (!user) {
    return (
      res.status(400).send({message : "Token Expired"})
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send({message : "Password does not password"})
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  console.log("saving ")
  await user.save({ validateBeforeSave: false });
  console.log("user saved")
  try{

    let token = jwt.sign({ id: user._id }, 'g3g3h3dwe', {expiresIn: '24h',});

    const options = {
      expires: new Date(Date.now() + 3600000), // 1 hour in milliseconds
      httpOnly: true,
    };
  
    res.status(200).cookie('token', token, options).json({
      success: true,
      user,
      token,
      message : "Updated Password"
    });
    console.log("done")

  } catch (error) {
    console.error(error)
    res.status(500).json({
      error : error ,
      message : "Error occcured while creating token"
    });
  }
});

// Get User Detail
exports.getUserDetails = (async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = (async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
// exports.updateProfile = (async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   if (req.body.avatar !== "") {
//     const user = await User.findById(req.user.id);

//     const imageId = user.avatar.public_id;
//   }

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// Get all users(admin)
exports.getAllUser = (async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = (async (req, res, next) => {
  let user = await User.find({email : req.body.email});

  if (!user) {
    return (
      res.send({message : "Email not found"})
    );
  }
  res.status(200).json({
    message : "Reset Link Sent to your mail",
    user,
  });
  
});

// update User Role -- Admin
exports.updateUserRole = (async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = (async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});