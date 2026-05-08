import createResponse from "../../common/utils/createResponse.js";
import handleAsync from "../../common/utils/handleAsync.js";
import { Feedback } from "./feedback.model.js";

export const createFeedback = handleAsync(async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res
    .status(201)
    .json(createResponse(true, 201, "Feedback created successfully", feedback));
});

export const getFeedbacks = handleAsync(async (req, res) => {
  const feedbacks = await Feedback.find();
  res
    .status(200)
    .json(createResponse(true, 200, "Feedbacks retrieved successfully", feedbacks));
});

export const getFeedbackDetail = handleAsync(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    return res.status(404).json(createResponse(false, 404, "Feedback not found"));
  }
  res
    .status(200)
    .json(createResponse(true, 200, "Feedback retrieved successfully", feedback));
});

export const updateFeedback = handleAsync(async (req, res) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!feedback) {
    return res.status(404).json(createResponse(false, 404, "Feedback not found"));
  }
  res
    .status(200)
    .json(createResponse(true, 200, "Feedback updated successfully", feedback));
});

export const deleteFeedback = handleAsync(async (req, res) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);
  if (!feedback) {
    return res.status(404).json(createResponse(false, 404, "Feedback not found"));
  }
  res.status(200).json(createResponse(true, 200, "Feedback deleted successfully"));
});
