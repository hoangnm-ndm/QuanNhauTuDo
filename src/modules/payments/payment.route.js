import { Router } from "express";
import validBodyRequest from "../../common/utils/validBodyRequest.js";
import { createPayment, deletePayment, getPaymentDetail, getPayments, updatePayment } from "./payment.controller.js";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { USER_ROLES } from "../../common/constants/user-role.enum.js";
import { roleMiddleware } from "../../common/middlewares/role.middleware.js";
import { paymentCreateSchema, paymentUpdateSchema } from "./payment.schema.js";

const paymentRouter = Router();

paymentRouter.get("/", getPayments);
paymentRouter.get("/:id", getPaymentDetail);

paymentRouter.use(
  authMiddleware,
  roleMiddleware(USER_ROLES.CASHIER, USER_ROLES.MANAGER, USER_ROLES.ADMIN)
);
paymentRouter.post("/", validBodyRequest(paymentCreateSchema), createPayment);
paymentRouter.patch("/:id", validBodyRequest(paymentUpdateSchema), updatePayment);
paymentRouter.delete("/:id", deletePayment);

export default paymentRouter;
