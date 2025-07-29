import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = await new mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

try {
  await db.connect();
  console.log("Conectado no banco de dados!");
} catch (error) {
  console.log("Erro: ", error);
}
