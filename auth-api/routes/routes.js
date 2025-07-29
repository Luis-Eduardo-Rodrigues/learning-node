import express from "express";
import {
  createUser,
  getAllUsers,
  loged,
} from "../controller/authController.js";
import { login } from "../controller/loginController.js";
import { authToken } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/protegida", authToken, loged);
router.post("/", createUser);
router.post("/login", login);

export default router;
