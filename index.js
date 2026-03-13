import express from "express";
import cookieParser from "cookie-parser";

const app = express();
import dotenv from "dotenv";
import connect from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT;
connect();

// application settings
import cors from "cors";
import authRoute from "./src/routes/authRoute.js";
import blogRoute from "./src/routes/blogRoute.js";
import commentRouter from "./src/routes/commentRoute.js";
import productRouter from "./src/routes/productRoute.js";
import learnRouter from "./src/routes/learnRoute.js";

// base  router settings
app.use(express.json());

// after frontend established

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(cookieParser());

// static images

app.use("/image", express.static("public/images"));

app.use("/api/user", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRouter);
app.use("/api/product", productRouter);
app.use("/api/learn", learnRouter);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
