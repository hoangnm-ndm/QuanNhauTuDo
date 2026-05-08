import mongoose from "mongoose";

import { schemaOptions } from "../../common/constants/schema-options.js";

const feedbackSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },

    comment: {
      type: String,
      default: "",
      maxlength: 2000,
    },
  },
  schemaOptions
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
