import { handleRoute } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import * as controller from "./user.controller";

const router = Router();

router.get("/settings", handleRoute(controller.user));
router.put("/settings", handleRoute(controller.update));

export default router;
