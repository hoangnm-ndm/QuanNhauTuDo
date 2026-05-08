import { Router } from "express";
import validBodyRequest from "../../common/utils/validBodyRequest.js";
import { feedbackCreateSchema, feedbackUpdateSchema } from "./feedback.schema.js";
import {
  createFeedback,
  deleteFeedback,
  getFeedbackDetail,
  getFeedbacks,
  updateFeedback,
} from "./feedback.controller.js";

const feedbackRouter = Router();

feedbackRouter.post("/", validBodyRequest(feedbackCreateSchema), createFeedback);
feedbackRouter.get("/", getFeedbacks);
feedbackRouter.get("/:id", getFeedbackDetail);
feedbackRouter.patch("/:id", validBodyRequest(feedbackUpdateSchema), updateFeedback);
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;
