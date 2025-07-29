import { db } from "../db/connection.js";

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (error) {
    res.json({ msg: "erro: ", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM produtos WHERE id_produto = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    res.json(rows);
  } catch (error) {
    res.json({ msg: "erro: ", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { nameProduct, qtdProduct } = req.body;

    if (!nameProduct || !qtdProduct) {
      return res.status(400).json({ error: "Não pode ser vazio!" });
    }

    const [result] = await db.query(
      "INSERT INTO produtos (nome_produto, qtd_produto) VALUES (?, ?)",
      [nameProduct, qtdProduct]
    );

    res.json({ msg: "usuario cadastrado com sucesso!" });
  } catch (error) {
    res.json({ msg: "erro: ", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { newName, newQtd } = req.body;
    const { id } = req.params;

    const [result] = await db.query(
      "UPDATE produtos SET nome_produto = ?, qtd_produto = ? WHERE id_produto = ?",
      [newName, newQtd, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    res.json({ msg: "usuario atualizado com sucesso!" });
  } catch (error) {
    res.json({ msg: "erro: ", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM produtos WHERE id_produto = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Produto não encontrado." });
    }

    res.json({ msg: "usuario deletado com sucesso!" });
  } catch (error) {
    res.json({ msg: "erro: ", error });
  }
};
