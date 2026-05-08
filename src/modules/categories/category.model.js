import mongoose from "mongoose";

import { schemaOptions } from "../../common/constants/schema-options.js";

const categorySchema = new mongoose.Schema(
  {
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    sortOrder: {
      // ???
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

categorySchema.index({ branch: 1, name: 1 }, { unique: true });

export const Category = mongoose.model("Category", categorySchema);
