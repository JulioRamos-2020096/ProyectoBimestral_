import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateRole, deleteUser, updateUserProfile } from "./user.controller.js";

const router = Router();

// Ruta para obtener un usuario por ID
router.get("/:id", getUserById);

// Ruta para obtener todos los usuarios
router.get("/", getUsers);

// Ruta para actualizar la contraseña de un usuario
router.put("/:id/password", updatePassword);

// Ruta para actualizar el rol de un usuario
router.put("/:id/role", updateRole);

// Ruta para eliminar un usuario
router.delete("/:id", deleteUser);

// Ruta para actualizar el perfil de un usuario
router.put("/:id/profile", updateUserProfile);

export default router;