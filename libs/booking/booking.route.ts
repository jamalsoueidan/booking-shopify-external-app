import { handleRoute } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./booking.controller";

const router = Router();

router.get("/bookings", handleRoute(controller.getBookings));
router.get("/bookings/:id", handleRoute(controller.getBookingById));

router.post(
  "/bookings",
  body("productId").notEmpty(),
  body("customerId").notEmpty(),
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  handleRoute(controller.create)
);

router.put(
  "/bookings/:id",
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  handleRoute(controller.update)
);

export default router;
