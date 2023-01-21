import { Router } from "express";
import { body, check, query } from "express-validator";
import { expressHelpers } from "@libs/express-helpers/handle-route";
import * as controller from "./notification.controller";

const router = Router();

router.get(
  "/notifications",
  query("orderId").notEmpty(),
  query("orderId").isDecimal(),
  query("lineItemId").notEmpty(),
  query("lineItemId").isDecimal(),
  expressHelpers(controller.get)
);

router.post(
  "/notifications",
  body("orderId").notEmpty(),
  body("orderId").isDecimal(),
  body("lineItemId").notEmpty(),
  body("lineItemId").isDecimal(),
  body("message").notEmpty(),
  body("to").notEmpty(),
  body("to").isIn(["customer", "staff"]),
  expressHelpers(controller.sendCustom)
);

router.post(
  "/notifications/:id",
  check("id").notEmpty(),
  expressHelpers(controller.resend)
);

router.delete(
  "/notifications/:id",
  check("id").notEmpty(),
  expressHelpers(controller.cancel)
);

export default router;
