import users from "../data/usersData.js";

export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "usuario não encontrado" });
  res.json(user);
};

export const createUser = (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    age,
  };
  users.push(newUser);
  res.status(201).json({ message: "usuario criado", user: newUser });
};

export const updateUser = (req, res) => {
  const { nome, idade } = req.body;
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "usuario não encontrado" });
  if (nome) user.nome = nome;
  if (idade) user.idade = idade;
  res.json({ message: "usuario atualizado", user });
};

export const deleteUser = (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "usuario não encontrado" });
  const deleted = users.splice(index, 1);
  res.json({ message: "usuario deletado", user: deleted[0] });
};
