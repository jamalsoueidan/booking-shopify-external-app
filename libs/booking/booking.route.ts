import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./booking.controller";
import { body } from "express-validator";

const router = Router();

router.get("/bookings", expressHelpers(controller.getBookings));
router.get("/bookings/:id", expressHelpers(controller.getBookingById));

router.post(
  "/bookings",
  body("productId").notEmpty(),
  body("customerId").notEmpty(),
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  expressHelpers(controller.create)
);

router.put(
  "/bookings/:id",
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  expressHelpers(controller.update)
);

export default router;
