import express from "express";
import TechnologyController from "../controllers/Technology";
import { checkExistsTechnology } from "../middlewares";

const technologyRouter = express.Router();
/*

/technologies   */
technologyRouter.get("/", TechnologyController.getAllTechnologiesByUsername);
technologyRouter.post("/", TechnologyController.create);
technologyRouter.put("/:id", checkExistsTechnology, TechnologyController.update);
technologyRouter.patch("/:id/studied", checkExistsTechnology, TechnologyController.markTechnologyAsStudied);
technologyRouter.delete("/:id", checkExistsTechnology, TechnologyController.remove);

export { technologyRouter };
