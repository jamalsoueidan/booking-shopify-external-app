import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./booking.controller";

const router = Router();

router.get("/booking", expressHelpers(controller.getBooking));
router.get("/booking/staff", expressHelpers(controller.getStaff));
router.get("/booking/:_id", expressHelpers(controller.getBooking));
router.get(
  "/booking/staff/:staff",
  expressHelpers(controller.getBookingByStaff)
);

export default router;
