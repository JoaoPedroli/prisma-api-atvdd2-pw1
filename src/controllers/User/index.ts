import { Request, Response } from "express";
import { UserPostTypes } from "../../@types/types.user";
import User from "../../model/User";

class UserController {
	public async create(req: Request, res: Response) {
		try {
			const userData = req.body as UserPostTypes;

			if (!userData.name?.length || !userData.username?.length) {
				return res
					.status(400)
					.json({ error: "Alguns campos estão faltando! " });
			}

			const alreadyExistsUser = await User.exists(userData.username);
			if (alreadyExistsUser) {
				res.status(400).json({
					error: "Este username já está em uso.",
				});
			} else {
				const userDataDTO = await User.create(userData);
				res.status(201).json(userDataDTO);
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor." });
		}
	}

	public async getAll(req: Request, res: Response) {
		try {
			const allUsers = await User.getAll();
			res.status(200).json(allUsers);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Erro no servidor." });
		}
	}
}

export default new UserController();
