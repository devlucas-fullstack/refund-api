import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.listen(3333, () => console.log("Servidor rodando na porta 3333"));
