import mongoose from "mongoose";

import { RESERVATION_STATUS } from "../../common/constants/reservation-status.enum.js";

import { schemaOptions } from "../../common/constants/schema-options.js";

const reservationSourceEnum = [
  "website",
  "facebook",
  "zalo",
  "phone",
  "walk_in",
];

const reservationSchema = new mongoose.Schema(
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
      required: false,
      index: true,
    },

    reservationCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    guestCount: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },

    reservationTime: {
      type: Date,
      required: true,
      index: true,
    },

    reservedUntil: {
      type: Date,
      default: null,
    },

    source: {
      type: String,
      enum: reservationSourceEnum,
      default: "website",
    },

    status: {
      type: String,
      enum: Object.values(RESERVATION_STATUS),
      default: RESERVATION_STATUS.PENDING,
      index: true,
    },

    note: {
      type: String,
      default: "",
      maxlength: 2000,
    },
  },
  schemaOptions
);

export const Reservation = mongoose.model("Reservation", reservationSchema);
