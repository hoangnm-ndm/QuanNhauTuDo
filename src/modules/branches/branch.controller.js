import createResponse from "../../common/utils/createResponse.js";
import handleAsync from "../../common/utils/handleAsync.js";
import { Branch } from "./branch.model.js";

export const createBranch = handleAsync(async (req, res) => {
  const branch = await Branch.create(req.body);
  res
    .status(201)
    .json(createResponse(true, 201, "Branch created successfully", branch));
});

export const getBranches = handleAsync(async (req, res) => {
  const branches = await Branch.find();
  res
    .status(200)
    .json(createResponse(true, 200, "Branches retrieved successfully", branches));
});

export const getBranchDetail = handleAsync(async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  if (!branch) {
    return res.status(404).json(createResponse(false, 404, "Branch not found"));
  }
  res
    .status(200)
    .json(createResponse(true, 200, "Branch retrieved successfully", branch));
});

export const updateBranch = handleAsync(async (req, res) => {
  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!branch) {
    return res.status(404).json(createResponse(false, 404, "Branch not found"));
  }
  res
    .status(200)
    .json(createResponse(true, 200, "Branch updated successfully", branch));
});

export const deleteBranch = handleAsync(async (req, res) => {
  const branch = await Branch.findByIdAndDelete(req.params.id);
  if (!branch) {
    return res.status(404).json(createResponse(false, 404, "Branch not found"));
  }
  res.status(200).json(createResponse(true, 200, "Branch deleted successfully"));
});
