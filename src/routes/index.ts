import { Router } from "express";
import { usersRouter } from "./user-router";
import { sessionRoutes } from "./session-router";
import { refundRoutes } from "./refund-router";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

const routes = Router();

// Rotas públicas
routes.use("/users", usersRouter);
routes.use("/sessions", sessionRoutes);

// Rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundRoutes);

export { routes };
