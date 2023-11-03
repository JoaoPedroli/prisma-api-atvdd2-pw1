import { Request } from "express";

export const getIdInParams = (req: Request) => {
	return parseInt(req.params?.id ?? "0");
};
