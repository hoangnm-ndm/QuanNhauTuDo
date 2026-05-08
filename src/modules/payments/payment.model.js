import mongoose from "mongoose";

import { PAYMENT_STATUS } from "../../common/constants/payment-status.enum.js";

import { schemaOptions } from "../../common/constants/schema-options.js";

const paymentMethods = ["cash", "vnpay", "momo", "banking", "pos"];

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    method: {
      type: String,
      enum: paymentMethods,
      required: true,
      index: true,
    },

    transactionId: {
      type: String,
      default: "",
      index: true,
      // ?? Depending on the payment gateway, we might want to enforce uniqueness for transactionId.
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  schemaOptions
);

export const Payment = mongoose.model("Payment", paymentSchema);
