import express from "express";
import {
  createLearn,
  deleteLearn,
  displayLearn,
  updateLearn,
} from "../controllers/learnController.js";

const learnRouter = express.Router();

learnRouter.post("/createLearn", createLearn);
learnRouter.put("/updateLearn/:id", updateLearn);
learnRouter.delete("/deleteLearn/:id", deleteLearn);
learnRouter.get("/displayLearn",displayLearn);


export default learnRouter;
