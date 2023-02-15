
import { handleRoute } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import { checkSchema } from "express-validator";
import * as controller from "./widget.controller";

const router = Router();

router.get("/widget/staff", handleRoute(controller.staff));

router.get(
  "/widget/availability",
  checkSchema({
    start: { notEmpty: true, isISO8601: true, toDate: true },
    end: { notEmpty: true, isISO8601: true, toDate: true },
    productId: { notEmpty: true },
  }),
  handleRoute(controller.availability)
);

router.get("/widget/settings", handleRoute(controller.settings));

export default router;
