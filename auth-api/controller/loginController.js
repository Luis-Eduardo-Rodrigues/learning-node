import { db } from "../database/connection.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;

  const [result] = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (result.length === 0) {
    res.status(401).json({ msg: "usuario nao encontrado" });
  }

  const userID = result[0].id_user;

  const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ msg: "login bem sucedido!", user: result[0], token });
};
