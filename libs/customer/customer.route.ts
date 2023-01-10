import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import { query } from "express-validator";
import * as controller from "./customer.controller";

const router = Router();

router.get(
  "/customers",
  query("name").notEmpty(),
  expressHelpers(controller.get)
);

export default router;
