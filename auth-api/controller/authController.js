import { db } from "../database/connection.js";

export const getAllUsers = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM users");
    res.json(result);
  } catch (error) {
    res.json({ msg: "Erro: ", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(401).json({ msg: "Nao pode ser vazio!" });
    }

    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    res.status(200).json({ msg: "usuario cadastrado!" });
  } catch (error) {
    res.json({ msg: "Erro: ", error });
  }
};

export const loged = (req, res) => {
  res.status(200).json({ msg: "voce entrou em uma rota protegida!" });
};
