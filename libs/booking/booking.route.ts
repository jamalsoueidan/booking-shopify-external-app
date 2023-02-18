import { handleRoute } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import * as controller from "./booking.controller";

const router = Router();

router.get("/bookings", handleRoute(controller.getBookings));
router.get(
  "/bookings/:id",
  param("_id")
    .custom((value) => isValidObjectId(value))
    .withMessage("not valid objectId"),
  handleRoute(controller.getBookingById),
);

router.post(
  "/bookings",
  body("productId").notEmpty(),
  body("customerId").notEmpty(),
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  handleRoute(controller.create),
);

router.put(
  "/bookings/:id",
  param("_id")
    .custom((value) => isValidObjectId(value))
    .withMessage("not valid objectId"),
  body("start").notEmpty(),
  body("end").notEmpty(),
  //body("staff").notEmpty(),
  handleRoute(controller.update),
);

export default router;
