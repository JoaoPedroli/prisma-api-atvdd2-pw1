import { TechnologyPostTypes } from "../@types/types.technology";
import { prisma } from "../database/prisma";

class Technologies {
	public async exists(username: string, id: number) {
		const alreadyExistsTechnology = await prisma.technologies.findUnique({
			where: {
				username,
				id,
			},
		});

		return alreadyExistsTechnology !== null;
	}

	public async getByUser(username: string) {
		return await prisma.technologies.findMany({
			where: {
				username,
			},
		});
	}

	public async create(
		username: string,
		{ title, deadline }: TechnologyPostTypes
	) {
		return await prisma.technologies.create({
			data: {
				title,
				deadline: new Date(deadline),
				studied: false,
				created_at: new Date(),
				username,
			},
		});
	}

	public async update(
		username: string,
		id: number,
		technologyData: TechnologyPostTypes
	) {
		technologyData.deadline = new Date(technologyData.deadline);
		return await prisma.technologies.update({
			where: {
				id,
				username,
			},
			data: technologyData,
		});
	}

	public async markAsStudied(username: string, id: number) {
		return await prisma.technologies.update({
			where: {
				id,
				username,
			},
			data: {
				studied: true,
			},
		});
	}

	public async delete(username: string, id: number) {
		await prisma.technologies.delete({
			where: {
				id,
				username,
			},
		});
	}
}

export default new Technologies();
