import { handleController } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./authentication.controller";

const router = Router();

router.post(
  "/password-phone",
  body("phone").notEmpty(),
  handleController(controller.receivePassword)
);

router.post(
  "/login",
  body("identification").notEmpty(),
  body("password").notEmpty(),
  handleController(controller.login)
);

export default router;
