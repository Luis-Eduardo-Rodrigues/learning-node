import app from "./src/app.js";
import conn from "./config/conexao.js";

const PORT = 3000;

conn.connect((e) => {
  if (e) {
    console.log("Errou ai");
  } else {
    console.log("Conectou no banco de dados!");

    app.listen(PORT, () => {
      console.log("Serve is running.....");
    });
  }
});
