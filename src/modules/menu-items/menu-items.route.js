import { Router } from "express";
import validBodyRequest from "../../common/utils/validBodyRequest.js";
import {
  menuItemCreateSchema,
  menuItemUpdateSchema,
} from "./menu-items.schema.js";
import {
  createMenuItem,
  deleteMenuItem,
  getMenuItemDetail,
  getMenuItems,
  updateMenuItem,
} from "./menu-items.controller.js";

const menuItemRouter = Router();

menuItemRouter.post("/", validBodyRequest(menuItemCreateSchema), createMenuItem);
menuItemRouter.get("/", getMenuItems);
menuItemRouter.get("/:id", getMenuItemDetail);
menuItemRouter.patch("/:id", validBodyRequest(menuItemUpdateSchema), updateMenuItem);
menuItemRouter.delete("/:id", deleteMenuItem);

export default menuItemRouter;
