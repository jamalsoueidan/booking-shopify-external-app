import { handleRoute } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./staff.controller";

const router = Router();

router.get("/staff", handleRoute(controller.get));

router.put(
  "/staff",
  body("group").not().exists(),
  body("shop").not().exists(),
  body("active").not().exists(),
  handleRoute(controller.update)
);

export default router;
