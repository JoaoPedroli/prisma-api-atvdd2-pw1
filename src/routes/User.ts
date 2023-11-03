import express from "express";
import UserController from "../controllers/User";

const userRouter = express.Router();
/*

/users   */
userRouter.get("/", UserController.getAll);
userRouter.post("/", UserController.create);

export { userRouter };
