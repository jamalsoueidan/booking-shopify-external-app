import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./booking.controller";

const router = Router();

router.get("/bookings", expressHelpers(controller.getBookings));
router.get("/bookings/:id", expressHelpers(controller.getBookingById));

export default router;
