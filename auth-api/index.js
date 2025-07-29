import express from "express";
import "./database/connection.js";
import router from "./routes/routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", router);

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta: 3000");
});
