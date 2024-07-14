import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.send({message:"hello"})
 }

 export const updateUser = async (req, res, next) => {
  // Check if the user is allowed to update
  if (req.user.id !== req.params.userid) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  // Validate password
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Validate username
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }
  }

  // Construct update object
  const updateData = {};
  if (req.body.username) updateData.username = req.body.username;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.profilePicture) updateData.profilePicture = req.body.profilePicture;
  if (req.body.password) updateData.password = req.body.password;

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.userid, {
      $set: updateData
    }, { new: true });

    if (!updateUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


 export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_key')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

 export const deleteUser=async (req,res,next)=>{
    // console.log(req.cookies.access_token)
    // console.log(req.cookies.id)
    // res.json({message:"deleted"})
    
    
      try {

        const del= await User.findByIdAndDelete(req.user.id)
        
        res.clearCookie("access_key")
        res.json({message:"Deleted Succsesfully"})
      
      } catch (error) {
        console.log(error)
        console.log(error.message)
      }
 }

 export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};