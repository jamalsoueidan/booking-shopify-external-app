import { handleController } from "@jamalsoueidan/pkg.backend";
import { Router } from "express";
import { body } from "express-validator";
import * as controller from "./account.controller";

const router = Router();

router.get("/account", handleController(controller.getAccount));

router.put(
  "/account",
  body("group").not().exists(),
  body("shop").not().exists(),
  body("active").not().exists(),
  body("role").not().exists(),
  body("password").not().exists(),
  handleController(controller.updateAccount),
);

router.get("/settings", handleController(controller.getSettings));
router.put("/settings", handleController(controller.updateSettings));

export default router;
