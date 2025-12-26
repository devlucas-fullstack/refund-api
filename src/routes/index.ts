import { Router } from "express";
import { usersRouter } from "./user-router";
import { sessionRoutes } from "./session-router";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRoutes);

export { routes };
