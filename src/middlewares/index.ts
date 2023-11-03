import { NextFunction, Request, Response } from "express";
import Technologies from "../model/Technologies";
import User from "../model/User";
import { getIdInParams } from "../utils";

export const checkExistsUserAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const username = req.header("username") ?? "";
		const hasUser = await User.exists(username);
		if (hasUser) {
			next();
		} else {
			res.status(404).json({
				error: `O username informado '${username}' não existe.`,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Erro no servidor." });
	}
};

export const checkExistsTechnology = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const username = req.header("username") ?? "";
		const id = getIdInParams(req);
		const hasTechnology = await Technologies.exists(username, id);
		if (hasTechnology) {
			next();
		} else {
			res.status(404).json({
				error: "A tecnologia informada não existe.",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Erro no servidor." });
	}
};
