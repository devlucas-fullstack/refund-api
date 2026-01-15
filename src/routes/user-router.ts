import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const usersRouter = Router();
const usersController = new UserController();

usersRouter.post("/", usersController.create);

export { usersRouter };
