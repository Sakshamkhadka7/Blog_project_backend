import express from "express";
import { commentPost, deleteComment, updateComment } from "../controllers/commentController.js";
import { user_mid } from "../middleware/userMid.js";

const commentRouter = express.Router();

commentRouter.post("/commentPost", user_mid, commentPost);
commentRouter.put("/updateComment/:id", user_mid, updateComment);
commentRouter.delete("/deleteComment/:id", user_mid, deleteComment);

export default commentRouter;