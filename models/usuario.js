const MySQLConnection = require('../database/mysql');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsuarios = async () => {
    try {
        const connection = await MySQLConnection();
        const [usuarios] = await connection.execute('SELECT * FROM Usuario');
        return usuarios;
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        throw new Error('Error al obtener todos los usuarios');
    }
};

const getUsuario = async (id) => {
    try {
        const connection = await MySQLConnection();

        // Verificar si existe el usuario
        const [existingRows] = await connection.execute('SELECT * FROM Usuario WHERE IdUsuario = ?', [id]);
        if (existingRows.length <= 0) {
            throw new Error('No existe un usuario con ese ID');
        }

        return existingRows[0];
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw new Error('Error al obtener el usuario: ' + error.message);
    }
};

const deleteUsuario = async (id) => {
    try {
        const connection = await MySQLConnection();
        // Verificar si el usuario existe
        const [existingRows] = await connection.execute('SELECT * FROM Usuario WHERE IdUsuario = ?', [id]);
        if (existingRows.length <= 0) {
            throw new Error('No existe un usuario con ese ID');
        }
        if (existingRows[0].Estado == 'Inactivo') {
            throw new Error('Este usuario ya fue eliminado');
        }
        // Verificar que no se elimine todos los administradores
        const [RowsAdmin] = await connection.execute("SELECT * FROM Usuario WHERE Rol = 'admin' AND Estado = 'Activo' ");
        if (RowsAdmin.length <= 1) {
            throw new Error('No puede eliminar al último usuario administrador, debe existir al menos otro administrador');
        }
        const [rows] = await connection.execute('UPDATE Usuario SET Estado = ? WHERE IdUsuario = ?', ['Inactivo', id]);
        console.log('El usuario se eliminó exitosamente');
        return rows;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw new Error('Error al eliminar el usuario: ' + error.message);
    }
};

const createUsuario = async (usuarioData) => {
    try {
        const connection = await MySQLConnection();
        console.log(usuarioData);
        // Verificar si la identificación o el correo ya existen
        const [existingIdentificacionRows] = await connection.execute('SELECT * FROM Usuario WHERE Identificacion = ?', [usuarioData.Identificacion]);
        if (existingIdentificacionRows.length > 0) {
            throw new Error('Ya existe un usuario con esa identificación');
        }

        const [existingCorreoRows] = await connection.execute('SELECT * FROM Usuario WHERE Correo = ?', [usuarioData.Correo]);
        if (existingCorreoRows.length > 0) {
            throw new Error('Ya existe un usuario con ese correo');
        }

        // Verificar si ya existe un usuario con rol de administrador
        const [adminRows] = await connection.execute('SELECT * FROM Usuario WHERE Rol = ?', ['admin']);
        if (adminRows.length === 0) {
            // Si no hay administrador, el nuevo usuario será administrador
            usuarioData.Rol = 'admin';
            usuarioData.Estado = 'Activo';
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(usuarioData.Contrasena, 10);
        console.log(hashedPassword);

        const [rows] = await connection.execute('INSERT INTO Usuario (Identificacion, Nombre, Apellido1, Apellido2, Rol, Contrasena, Correo, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            usuarioData.Identificacion,
            usuarioData.Nombre,
            usuarioData.Apellido1,
            usuarioData.Apellido2,
            usuarioData.Rol,
            hashedPassword,
            usuarioData.Correo,
            usuarioData.Estado,
            usuarioData.CambiarContrasena == "true" ? 1 : 0
        ]);
        console.log('El usuario se creó correctamente');
        return rows;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Error('Error al crear el usuario: ' + error.message);
    }
};

const updateUsuario = async (id, newData) => {
    try {
        const connection = await MySQLConnection();

        // Verificar si el usuario existe
        const [existingRows] = await connection.execute('SELECT * FROM Usuario WHERE IdUsuario = ?', [id]);
        if (existingRows.length <= 0) {
            throw new Error('No existe un usuario con ese ID');
        }

        // Verificar si la nueva identificación o correo ya existen para otro usuario
        const [existingIdentificacionRows] = await connection.execute('SELECT * FROM Usuario WHERE Identificacion = ? AND IdUsuario != ?', [newData.Identificacion, id]);
        if (existingIdentificacionRows.length > 0) {
            throw new Error('Ya existe otro usuario con esa identificación');
        }

        const [existingCorreoRows] = await connection.execute('SELECT * FROM Usuario WHERE Correo = ? AND IdUsuario != ?', [newData.Correo, id]);
        if (existingCorreoRows.length > 0) {
            throw new Error('Ya existe otro usuario con ese correo');
        }

        // Actualizar el usuario
        const updateQuery = 'UPDATE Usuario SET Identificacion = ?, Nombre = ?, Apellido1 = ?, Apellido2 = ?, Rol = ?, Contrasena = ?, Correo = ?, Estado = ? WHERE IdUsuario = ?';
        const values = [
            newData.Identificacion,
            newData.Nombre,
            newData.Apellido1,
            newData.Apellido2,
            newData.Rol,
            newData.Contrasena,
            newData.Correo,
            newData.Estado,
            id
        ];

        const [rows] = await connection.execute(updateQuery, values);
        console.log('El usuario se actualizó exitosamente');
        return rows;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw new Error('Error al actualizar el usuario: ' + error.message);
    }
};


const loginUsuario = async (usuarioData) => {
    try {
        const connection = await MySQLConnection();

        // Consultar el usuario por su cédula
        const [rows] = await connection.execute('SELECT * FROM Usuario WHERE Identificacion = ?', [usuarioData.Identificacion]);

        // Verificar si el usuario existe
        if (rows.length === 0) {
            throw new Error('No existe ese usuario registrado');
        }

        // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
        const passwordMatch = await bcrypt.compare(usuarioData.Contrasena, rows[0].Contrasena);

        if (!passwordMatch) {
            throw new Error('Cédula o contraseña incorrecta');
        }

        // Generar el token JWT con los datos del usuario (en este caso, puedes personalizar qué datos incluir)
        const token = jwt.sign({ usuario: rows[0] }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return { token };
    } catch (error) {
        console.error('Error en el login del usuario:', error);
        throw new Error('Error en el login del usuario: ' + error.message);
    }
};


module.exports = { getAllUsuarios, getUsuario, deleteUsuario, createUsuario, updateUsuario, loginUsuario };
