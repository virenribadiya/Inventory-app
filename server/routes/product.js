import { Router } from "express";
import { productController } from "../controllers/product.js";

const productRouter = Router();

productRouter.post("/getAllProducts", productController.getAllProducts);

export { productRouter };

