import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.get("/settings", expressHelpers(controller.user));
router.put("/settings", expressHelpers(controller.update));

export default router;
