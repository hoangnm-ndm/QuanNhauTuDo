import { Router } from "express";
import validBodyRequest from "../../common/utils/validBodyRequest.js";
import { productCreateSchema, productUpdateSchema } from "./product.schema.js";
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

productRouter.post("/", validBodyRequest(productCreateSchema), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductDetail);
productRouter.patch("/:id", validBodyRequest(productUpdateSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.delete("/soft-delete/:id", softDeleteProduct);
productRouter.patch("/restore/:id", restoreProduct);

export default productRouter;
