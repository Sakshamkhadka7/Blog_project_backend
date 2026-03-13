import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const image = req.file.filename;

    if (!name || !email || !password || !image) {
      return res.status(401).json({
        message: "All fields are mandatory",
      });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(401).json({
        message: "User already existed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await new User({
      name: name,
      email: email,
      password: hashedPassword,
      profileImage: image,
    });

    user = await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.log("Error occured in registered");
    console.log(error);
    return res.status(401).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All fields are mandatory",
      });
    }

    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(404).json({
        message: "User not found please register",
      });
    }

    const correctPassword = await bcrypt.compare(password, isExist.password);

    if (!correctPassword) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: isExist._id,
        role: isExist.role,
        email: isExist.email,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("jwt_cookie", token).status(200).json({
      status: 200,
      message: "User login successfully",
      success: true,
      user: isExist,
      token,
    });
  } catch (error) {
    console.log("Error occured in a login");
    console.log(error);
    return res.status(401).json({
      message: "Internal server error",
    });
  }
};

export const getAllusers = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      res.status(401).json({
        status: 401,
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User found",
      user: user,
    });
  } catch (error) {
    console.log("Error occured in a getAll Users");
    console.log(error);
    res.status(401).json({
      status: 401,
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    status: 200,
    success: true,
    message: "User Found",
    user: req.userMid,
  });
};

export const logout = async (req, res) => {
  return res.clearCookie("jwt_cookie").status(200).json({
    status: 200,
    success: true,
    message: "User Logout successfully",
  });
};
