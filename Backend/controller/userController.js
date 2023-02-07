const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");



//Generate JWT

const generationToken =(id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}
// @desc    Register New  User
//@route    POST/api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exits");
  }
  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
   
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password:user.password,
      token: generationToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a  User
//@route    POST/api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Check for Email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password:user.password,
      token: generationToken(user._id)
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
  res.json({ message: "User Login" });
});
// @desc    Get  User data
//@route    GET/api/users
//@access   Private

const getMe = asyncHandler(async (req, res) => {
 const { _id, name, email } = await User.findById(req.user.id)

 res.status(200).json({
    id:_id,
    name,
    email,
 })
});



module.exports = {
  registerUser,
  loginUser,
  getMe,
};
