import express from "express";
import { router } from "./routes/index";

const app = express();
app.use(express.json());
app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
	console.info(`-=-=- Server is running on port ${PORT}! 🎉 -=-=-`);
});
