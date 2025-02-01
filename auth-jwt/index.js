import express from "express";
import jwt from "jsonwebtoken";

const app = express();
// eu sei q são variaveis de ambiente
const PORT = 3000;
const SECRET_KEY = "32fcd87e4d3ea9ca0eab642223e2212844e46175";

app.use(express.json());

//mock
const users = [
  { id: 1, username: "Luis", password: "12345678", role: "admin" }, //bcrypt
  { id: 2, username: "Fernanda", password: "12345678", role: "user" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username == username && user.password == password
  );
  if (user) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ message: token });
  } else {
    res.status(401).json({ err: "Usuario ou senha invalidos" });
  }
});

// middleware para autenticar o token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.json({ msg: "Erro. Token nao fornecido" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token invalido" });
    req.user = user;
    next();
  });
};

// rota autenticada
app.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ msg: "Bem-vindo a rota autenticada" });
});

// rota privada (admin)
app.get("/admin", authenticateToken, (req, res) => {
  if (req.user.role != "admin") {
    return res.status(403).json({ err: "Acesso negado" });
  }
  res.status(200).json({ msg: "Ola, bem vindo a rota adminstrativa!" });
});

app.listen(PORT, () => console.log("Server is running....."));
