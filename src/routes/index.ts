import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares";
import { technologyRouter } from "./Technology";
import { userRouter } from "./User";

const router = Router();

router.use("/users", userRouter);
router.use("/technologies", checkExistsUserAccount);
router.use("/technologies", technologyRouter);

export { router };
