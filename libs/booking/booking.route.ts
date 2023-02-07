import { handleController } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./booking.controller";

const router = Router();

router.get("/bookings", handleController(controller.getBookings));
router.get("/bookings/:id", handleController(controller.getBookingById));

router.post(
  "/bookings",
  body("productId").notEmpty(),
  body("customerId").notEmpty(),
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  handleController(controller.create)
);

router.put(
  "/bookings/:id",
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  handleController(controller.update)
);

export default router;
