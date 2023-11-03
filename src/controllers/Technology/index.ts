import { Request, Response } from "express";
import { TechnologyPostTypes } from "../../@types/types.technology";
import Technologies from "../../model/Technologies";
import { getIdInParams } from "../../utils";

class TechnologyController {
	public async getAllTechnologiesByUsername(req: Request, res: Response) {
		try {
			const username = req.header("username") ?? "";
			const allTechnologiesData = await Technologies.getByUser(username);
			res.status(200).json(allTechnologiesData);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor." });
		}
	}

	public async create(req: Request, res: Response) {
		try {
			const username = req.header("username") ?? "";
			const technologyData = req.body as TechnologyPostTypes;
			const userTechnologyDataDTO = await Technologies.create(
				username,
				technologyData
			);
			res.status(201).json(userTechnologyDataDTO);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor." });
		}
	}

	public async update(req: Request, res: Response) {
		try {
			const username = req.header("username") ?? "";
			const id = getIdInParams(req);
			const newTechnologyData = req.body;
			const technologyDTO = await Technologies.update(
				username,
				id,
				newTechnologyData
			);
			res.status(200).json(technologyDTO);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor. " });
		}
	}

	public async markTechnologyAsStudied(req: Request, res: Response) {
		try {
			const username = req.header("username") ?? "";
			const id = getIdInParams(req);
			await Technologies.markAsStudied(username, id);
			res.status(200).send("Tecnologia marcada como estudada.");
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor. " });
		}
	}

	public async remove(req: Request, res: Response) {
		try {
			const username = req.header("username") ?? "";
			const id = getIdInParams(req);
			await Technologies.delete(username, id);
			const remainingTechnologies = await Technologies.getByUser(
				username
			);
			res.status(200).json(remainingTechnologies);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor. " });
		}
	}
}

export default new TechnologyController();
