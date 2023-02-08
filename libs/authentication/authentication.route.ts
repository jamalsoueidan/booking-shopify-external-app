import { handleRoute } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./authentication.controller";

const router = Router();

router.post(
  "/password-phone",
  body("phone").notEmpty(),
  handleRoute(controller.receivePassword)
);

router.post(
  "/login",
  body("identification").notEmpty(),
  body("password").notEmpty(),
  handleRoute(controller.login)
);

export default router;
