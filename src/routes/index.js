import { Router } from "express";
import productRouter from "../modules/product/product.route.js";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/users/user.route.js";
import branchRouter from "../modules/branches/branch.route.js";
import categoryRouter from "../modules/categories/category.route.js";
import menuItemRouter from "../modules/menu-items/menu-items.route.js";
import tableRouter from "../modules/table/table.route.js";
import reservationRouter from "../modules/reservations/reservation.route.js";
import orderRouter from "../modules/orders/order.route.js";
import paymentRouter from "../modules/payments/payment.route.js";
import feedbackRouter from "../modules/feedbacks/feedback.route.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/branches", branchRouter);
router.use("/categories", categoryRouter);
router.use("/menu-items", menuItemRouter);
router.use("/tables", tableRouter);
router.use("/reservations", reservationRouter);
router.use("/orders", orderRouter);
router.use("/payments", paymentRouter);
router.use("/feedbacks", feedbackRouter);

export default router;
