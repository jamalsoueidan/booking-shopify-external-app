import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import { query } from "express-validator";
import * as controller from "./staff-schedule.controller";

const router = Router();

router.get(
  "/schedules",
  query("start").notEmpty(),
  query("end").notEmpty(),
  expressHelpers(controller.get)
);

router.post("/schedules", expressHelpers(controller.create));

router.put("/schedules", expressHelpers(controller.update));

router.delete("/schedules/:schedule", expressHelpers(controller.destroy));

router.put(
  "/schedules/:schedule/group/:groupId",
  expressHelpers(controller.updateGroup)
);

router.delete(
  "/schedules/:schedule/group/:groupId",
  expressHelpers(controller.destroyGroup)
);

export default router;
