import { Router } from "express";
import validBodyRequest from "../../common/utils/validBodyRequest.js";
import { branchCreateSchema, branchUpdateSchema } from "./branch.schema.js";
import {
  createBranch,
  deleteBranch,
  getBranchDetail,
  getBranches,
  updateBranch,
} from "./branch.controller.js";

const branchRouter = Router();

branchRouter.post("/", validBodyRequest(branchCreateSchema), createBranch);
branchRouter.get("/", getBranches);
branchRouter.get("/:id", getBranchDetail);
branchRouter.patch("/:id", validBodyRequest(branchUpdateSchema), updateBranch);
branchRouter.delete("/:id", deleteBranch);

export default branchRouter;
