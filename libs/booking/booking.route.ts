import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./booking.controller";

const router = Router();

router.get("/booking", expressHelpers(controller.getBooking));

export default router;
