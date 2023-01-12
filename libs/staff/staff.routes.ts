import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./staff.controller";
import { body } from "express-validator";

const router = Router();

router.get("/staff", expressHelpers(controller.get));

router.put(
  "/staff",
  body("group").isEmpty(),
  body("shop").isEmpty(),
  body("active").isEmpty(),
  expressHelpers(controller.update)
);

export default router;
