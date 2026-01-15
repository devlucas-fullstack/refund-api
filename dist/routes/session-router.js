"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const session_controller_1 = require("../controllers/session-controller");
const sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes = sessionRoutes;
const sessionController = new session_controller_1.SessionController();
sessionRoutes.post("/", sessionController.create);
