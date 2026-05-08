import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProducts,
  restoreProduct,
  softDeleteProduct,
  updateProduct,
} from "./product.controller.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductDetail);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.delete("/soft-delete/:id", softDeleteProduct);
productRouter.patch("/restore/:id", restoreProduct);

export default productRouter;
