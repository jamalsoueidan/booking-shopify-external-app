import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./authentication.controller";

const router = Router();

router.post(
  "/login/phone",
  body("phone").notEmpty(),
  expressHelpers(controller.loginPhone)
);

router.post(
  "/login/phone-password",
  body("phone").notEmpty(),
  body("password").notEmpty(),
  expressHelpers(controller.validatePhonePassword)
);

router.post(
  "/login/email",
  body("email").notEmpty(),
  body("password").notEmpty(),
  expressHelpers(controller.loginEmail)
);

export default router;
