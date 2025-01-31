import conn from "../database/conexao.js";

class SelecaoController {
  index(req, res) {
    const sql = "SELECT * FROM selecoes";
    conn.query(sql, (err, response) => {
      if (err) {
        res.status(404).json({ err: err });
      } else {
        res.status(200).json(response);
      }
    });
  }

  show(req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM selecoes WHERE id=?";
    conn.query(sql, id, (err, response) => {
      const row = response[0];
      if (err) {
        res.status(404).json({ err: err });
      } else {
        res.status(200).json(row);
      }
    });
  }

  store(req, res) {
    const dados = req.body;

    const sql = "INSERT INTO selecoes SET ?";

    conn.query(sql, dados, (err, response) => {
      const row = response[0];
      if (err) {
        res.status(404).json({ err: err });
      } else {
        res.status(201).json({ msg: "Seleção cadastrada!" });
      }
    });
  }

  update(req, res) {
    const id = req.params.id;
    const dados = req.body;

    const sql = "UPDATE selecoes SET ? WHERE id=?";

    conn.query(sql, [dados, id], (err, response) => {
      const row = response[0];
      if (err) {
        res.status(404).json({ err: err });
      } else {
        res.status(200).json({ msg: "Seleção atualizada!" });
      }
    });
  }

  delete(req, res) {
    const id = req.params.id;
    const sql = "DELETE FROM selecoes WHERE id=?";
    conn.query(sql, id, (err, response) => {
      if (err) {
        res.status(404).json({ err: err });
      } else {
        res.status(200).json({ msg: "Seleção deletada!" });
      }
    });
  }
}

export default new SelecaoController();
