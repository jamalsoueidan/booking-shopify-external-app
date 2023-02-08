
import { handleRoute } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { checkSchema } from "express-validator";
import * as controller from "./widget.controller";

const router = Router();

router.get("/widget/staff", handleRoute(controller.staff));

router.get(
  "/widget/availability",
  checkSchema({
    start: { notEmpty: true },
    end: { notEmpty: true },
    productId: { notEmpty: true },
  }),
  handleRoute(controller.availability)
);

router.get("/widget/settings", handleRoute(controller.settings));

export default router;
