import mongoose from "mongoose";

import { ORDER_STATUS } from "../../common/constants/order-status.enum.js";

import { PAYMENT_STATUS } from "../../common/constants/payment-status.enum.js";

import { schemaOptions } from "../../common/constants/schema-options.js";

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    nameSnapshot: {
      type: String,
      required: true,
    },

    imageSnapshot: {
      type: String,
      default: null,
    },

    priceSnapshot: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    note: {
      type: String,
      default: "",
      maxlength: 500,
    },

    customizations: {
      // For simplicity, we store customizations as an array of strings.
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },
  },
  { _id: true }
  // We keep the default _id for order items to allow easy referencing and updates if needed.
);

const orderSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
      index: true,
    },

    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: false,
      index: true,
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerName: {
      type: String,
      default: "",
      trim: true,
    },

    customerPhone: {
      type: String,
      default: "",
      trim: true,
    },

    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order items cannot be empty",
      },
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    tax: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

orderSchema.index({
  branch: 1,
  createdAt: -1,
  // We include orderNumber in the index to optimize lookups by order number within a branch.
  // ? -1 for descending order, as newer orders are more likely to be queried.
});

export const Order = mongoose.model("Order", orderSchema);
