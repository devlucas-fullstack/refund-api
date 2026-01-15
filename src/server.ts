import express from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
