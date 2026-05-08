import { Router } from "express";
import productRouter from "../modules/product/product.route.js";
import authRouter from "../modules/auth/auth.route.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
