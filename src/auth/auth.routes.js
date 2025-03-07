import { Router } from "express";
import { register, login } from "./auth.controller.js";

const router = Router();

// Ruta para registrar usuarios y administradores
router.post("/register", register);

// Ruta para el login de usuarios y administradores
router.post("/login", login);

export default router;