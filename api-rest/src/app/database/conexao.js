import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "12345",
  database: "db_copa",
});

conn.connect();

export const consulta = (sql, values = "", msgReject) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, values, (erro, response) => {
      if (erro) return reject(msgReject);

      const row = JSON.parse(JSON.stringify(response));
      return resolve(row);
    });
  });
};

export default conn;
