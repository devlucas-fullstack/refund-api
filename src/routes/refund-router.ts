import { Router } from "express";
import { RefundController } from "@/controllers/refund-controller";
import { allowRoles } from "@/middlewares/allow-roles";

const refundRoutes = Router();
const refundController = new RefundController();

refundRoutes.post("/", allowRoles("employee"), refundController.create);

export { refundRoutes };
