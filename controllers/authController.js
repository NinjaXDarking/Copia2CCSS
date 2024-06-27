// controllers/authController.js
const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const SECRET_KEY = process.env.JWTSECURITY;

// Registro de usuario
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = await Usuario.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario.' });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { identificador, Contrasena } = req.body;
    try {
        // Buscar usuario por Identificación o Correo
        const user = await Usuario.getUserByIdentificacionOrEmail(identificador);
        if (!user) {
            return res.status(401).json({ error: 'Identificación/Correo o contraseña incorrectos.' });
        }

        const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);
      
        if (!isMatch) {
            return res.status(401).json({ error: 'Identificación/Correo o contraseña incorrectos.' });
        }

        const token = jwt.sign(
            { id: user.IdUsuario, role: user.Rol },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};
