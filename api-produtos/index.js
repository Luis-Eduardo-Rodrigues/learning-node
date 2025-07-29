import express from "express";
import "./db/connection.js";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/produtos", routes);

app.listen(3000, () => {
  console.log("Servido rodando na porta 3000!");
});
