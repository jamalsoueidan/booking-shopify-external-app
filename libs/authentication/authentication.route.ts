import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./authentication.controller";

const router = Router();

router.post(
  "/password-phone",
  body("phone").notEmpty(),
  expressHelpers(controller.receivePassword)
);

router.post(
  "/login",
  body("identification").notEmpty(),
  body("password").notEmpty(),
  expressHelpers(controller.login)
);

export default router;
