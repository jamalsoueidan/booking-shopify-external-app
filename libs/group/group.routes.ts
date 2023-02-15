import { handleRoute } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import * as controller from "./group.controller";

const router = Router();

router.get("/group", handleRoute(controller.getStaff));

export default router;
