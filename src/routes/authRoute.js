import express from "express";
import { getAllusers, getMe, login, logout, registerUser } from "../controllers/authController.js";
import upload from "../middleware/imageUploader.js";
import { user_mid } from "../middleware/userMid.js";

const authRoute=express.Router();

authRoute.post("/register",upload.single("profileImage"),registerUser);
authRoute.post("/login",login);
authRoute.get("/getMe",user_mid,getMe);
authRoute.get("/getUser",getAllusers);
authRoute.get("/logout",user_mid,logout);



export default authRoute;

