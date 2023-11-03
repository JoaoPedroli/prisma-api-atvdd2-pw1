import { UserPostTypes } from "../@types/types.user";
import { prisma } from "../database/prisma";

class User {
	public async exists(username: string) {
		const alreadyExistsUsername = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		return alreadyExistsUsername !== null;
	}

	public async create(userData: UserPostTypes) {
		return await prisma.user.create({
			data: userData,
		});
	}

	public async getAll() {
		return await prisma.user.findMany();
	}
}

export default new User();
