import { handleController } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./staff.controller";

const router = Router();

router.get("/staff", handleController(controller.get));

router.put(
  "/staff",
  body("group").not().exists(),
  body("shop").not().exists(),
  body("active").not().exists(),
  handleController(controller.update)
);

export default router;
