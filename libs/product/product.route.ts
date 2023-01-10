import { expressHelpers } from "@libs/express-helpers/handle-route";
import { Router } from "express";
import * as controller from "./product.controller";

const router = Router();

router.get("/products", expressHelpers(controller.getProducts));

export default router;
