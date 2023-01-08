import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.get("/current-staff", expressHelpers(controller.staff));
router.get("/settings", expressHelpers(controller.user));

export default router;
