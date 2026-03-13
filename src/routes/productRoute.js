import express from "express";
import { createProduct, deleteProduct, displayProduct, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/imageUploader.js";

const productRouter=express.Router();

productRouter.post("/createProduct",upload.single("image"),createProduct);
productRouter.put("/updateProduct/:id",upload.single("image"),updateProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);
productRouter.get("/displayProduct",displayProduct);


export default productRouter;