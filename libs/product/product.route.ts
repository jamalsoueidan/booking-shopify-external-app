import { handleController } from "@jamalsoueidan/pkg.bsb";
import { Router } from "express";
import * as controller from "./product.controller";

const router = Router();

router.get("/products", handleController(controller.getProducts));

export default router;
