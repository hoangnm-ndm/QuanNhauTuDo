import mongoose from "mongoose";

import { schemaOptions } from "../../common/constants/schema-options.js";

const menuItemSchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 2000,
    },

    image: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    available: {
      type: Boolean,
      default: true,
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    preparationTime: {
      type: Number,
      default: 15,
      min: 1,
    },
  },
  schemaOptions
);

menuItemSchema.index({ branch: 1, slug: 1 }, { unique: true });

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
