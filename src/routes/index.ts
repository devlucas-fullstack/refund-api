import { Router } from "express";
import { usersRouter } from "./user-router";
import { sessionRoutes } from "./session-router";
import { refundRoutes } from "./refund-router";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRoutes);
routes.use("/refunds", refundRoutes);

export { routes };
