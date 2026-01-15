"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const user_router_1 = require("./user-router");
const session_router_1 = require("./session-router");
const refund_router_1 = require("./refund-router");
const ensure_authenticated_1 = require("../middlewares/ensure-authenticated");
const routes = (0, express_1.Router)();
exports.routes = routes;
// Rotas públicas
routes.use("/users", user_router_1.usersRouter);
routes.use("/sessions", session_router_1.sessionRoutes);
// Rotas privadas
routes.use(ensure_authenticated_1.ensureAuthenticated);
routes.use("/refunds", refund_router_1.refundRoutes);
