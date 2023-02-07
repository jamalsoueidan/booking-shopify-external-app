import { handleController } from "@jamalsoueidan/bsb.bsb-pkg";
import { Router } from "express";
import { query } from "express-validator";
import * as controller from "./staff-schedule.controller";

const router = Router();

router.get(
  "/schedules",
  query("start").notEmpty(),
  query("end").notEmpty(),
  handleController(controller.get)
);

router.post("/schedules", handleController(controller.create));

router.put("/schedules", handleController(controller.update));

router.delete("/schedules/:schedule", handleController(controller.destroy));

router.put(
  "/schedules/:schedule/group/:groupId",
  handleController(controller.updateGroup)
);

router.delete(
  "/schedules/:schedule/group/:groupId",
  handleController(controller.destroyGroup)
);

export default router;
