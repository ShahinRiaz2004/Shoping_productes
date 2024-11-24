const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require('./../utils/catchAsync');


exports.signup = catchAsync(async(req, res, next) => {
  const newUser = await User.create(req.body)

    const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

  //   name:req.body.name,
  //   email: req.body.email,
  //   password:req.body.password,
  //   passwordConfirmed: req.body.passwordConfirmed
  // });

  res.status(201).json({
    status:"Success!",
    token,
    data:{
        user:newUser
    }
  })

})
