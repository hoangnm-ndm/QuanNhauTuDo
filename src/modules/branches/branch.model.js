import mongoose from "mongoose";

import { schemaOptions } from "../../common/constants/schema-options.js";

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    thumbnail: {
      type: String,
      default: null,
    },

    openTime: {
      type: String,
      required: false,
    },

    closeTime: {
      type: String,
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  schemaOptions
);

// xử lý slug tự sinh theo name.

export const Branch = mongoose.model("Branch", branchSchema);
