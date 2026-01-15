"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
const usersController = new user_controller_1.UserController();
usersRouter.post("/", usersController.create);
