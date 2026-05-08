import mongoose from "mongoose";

import { TABLE_STATUS } from "../../common/constants/table-status.enum.js";

import { schemaOptions } from "../../common/constants/schema-options.js";

const tableSchema = new mongoose.Schema(
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
      maxlength: 50,
    },

    qrCode: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },

    status: {
      type: String,
      enum: Object.values(TABLE_STATUS),
      default: TABLE_STATUS.AVAILABLE,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

tableSchema.index({ branch: 1, name: 1 }, { unique: true });

export const Table = mongoose.model("Table", tableSchema);
