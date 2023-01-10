import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./group.controller";

const router = Router();

router.get("/group", expressHelpers(controller.getStaff));

export default router;
