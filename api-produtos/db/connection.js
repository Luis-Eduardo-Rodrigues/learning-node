import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = await new mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_BANCO,
});

try {
  await db.connect();
  console.log("Conectado no banco de dados!");
} catch (error) {
  console.log("erro: " + error);
}
