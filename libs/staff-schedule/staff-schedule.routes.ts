import { handleRoute } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { query } from "express-validator";
import * as controller from "./staff-schedule.controller";

const router = Router();

router.get(
  "/schedules",
  query("start").notEmpty(),
  query("end").notEmpty(),
  handleRoute(controller.get)
);

router.post("/schedules", handleRoute(controller.create));

router.put("/schedules", handleRoute(controller.update));

router.delete("/schedules/:schedule", handleRoute(controller.destroy));

router.put(
  "/schedules/:schedule/group/:groupId",
  handleRoute(controller.updateGroup)
);

router.delete(
  "/schedules/:schedule/group/:groupId",
  handleRoute(controller.destroyGroup)
);

export default router;
