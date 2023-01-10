import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import { checkSchema } from "express-validator";
import * as controller from "./widget.controller";

const router = Router();

router.get("/widget/staff", expressHelpers(controller.staff));

router.get(
  "/widget/availability",
  checkSchema({
    start: { notEmpty: true },
    end: { notEmpty: true },
    productId: { notEmpty: true },
  }),
  expressHelpers(controller.availability)
);

router.get("/widget/settings", expressHelpers(controller.settings));

export default router;
