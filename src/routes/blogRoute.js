import express from "express";
import { createBlog, deleteBlog, displayBlog, updateBlog } from "../controllers/blogController.js";
import upload from "../middleware/imageUploader.js";
import { user_mid } from "../middleware/userMid.js";

const blogRoute = express.Router();

blogRoute.post("/blogPost", upload.single("image"),user_mid,createBlog);
blogRoute.get("/displayBlog", displayBlog);
blogRoute.put("/updateBlog/:id", upload.single("image"),user_mid,updateBlog);
blogRoute.delete("/delete/:id", deleteBlog);


export default blogRoute;
