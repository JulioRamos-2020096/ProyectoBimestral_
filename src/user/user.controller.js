import { hash, verify } from "argon2";
import User from "./user.model.js";

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

// Actualizar contraseña
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await verify(user.password, oldPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña antigua incorrecta" });
        }

        user.password = await hash(newPassword);
        await user.save();
        res.json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la contraseña" });
    }
};

// Actualizar rol
export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.role = role;
        await user.save();
        res.json({ message: "Rol actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el rol" });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (user.role === "ADMIN_ROLE") {
            return res.status(403).json({ message: "No se pueden eliminar administradores" });
        }

        await user.remove();
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
};

// Editar perfil de usuario
export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, username, email, phone } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();
        res.json({ message: "Perfil actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el perfil" });
    }
};
