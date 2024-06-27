// models/Usuario.js
const MySQLConnection = require('../database/mysql');
const bcrypt = require('bcryptjs');

// Crear usuario
const createUser = async (user) => {
    const { Identificacion, Nombre, Apellido1, Apellido2, Rol, Contrasena, Correo, Estado } = user;

    let connection;
    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(Contrasena, 10);

        // Abrir conexión a la base de datos
        connection = await MySQLConnection();

        // Ejecutar consulta para insertar el usuario
        const [result] = await connection.query(
            `INSERT INTO Usuario (Identificacion, Nombre, Apellido1, Apellido2, Rol, Contrasena, Correo, Estado)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [Identificacion, Nombre, Apellido1, Apellido2, Rol, hashedPassword, Correo, Estado]
        );

        // Retornar usuario creado
        return { IdUsuario: result.insertId, ...user, Contrasena: hashedPassword };
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Cerrar conexión
    }
};

// Obtener usuario por identificación o correo
const getUserByIdentificacionOrEmail = async (identificador) => {
    let connection;
    try {
        // Abrir conexión a la base de datos
        connection = await MySQLConnection();

        // Ejecutar consulta para obtener el usuario
        const [rows] = await connection.query(
            `SELECT * FROM Usuario WHERE Identificacion = ? OR Correo = ?`,
            [identificador, identificador]
        );

        // Verificar si el usuario existe
        if (rows.length === 0) return null;
        return rows[0];
    } catch (error) {
        console.error('Error al obtener el usuario por identificación o correo:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Cerrar conexión
    }
};

module.exports = {
    createUser,
    getUserByIdentificacionOrEmail
};
