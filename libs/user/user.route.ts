import { handleController } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.get("/settings", handleController(controller.user));
router.put("/settings", handleController(controller.update));

export default router;
