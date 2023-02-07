
import { handleController } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { checkSchema } from "express-validator";
import * as controller from "./widget.controller";

const router = Router();

router.get("/widget/staff", handleController(controller.staff));

router.get(
  "/widget/availability",
  checkSchema({
    start: { notEmpty: true },
    end: { notEmpty: true },
    productId: { notEmpty: true },
  }),
  handleController(controller.availability)
);

router.get("/widget/settings", handleController(controller.settings));

export default router;
