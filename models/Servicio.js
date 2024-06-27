// models/Servicio.js
const MySQLConnection = require('../database/mysql');

// Obtener todos los servicios
const getAllServicios = async () => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM servicio');
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los servicios:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Obtener un servicio por ID
const getServicioById = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM servicio WHERE ServicioID = ?', [id]);
        if (rows.length === 0) throw new Error('Servicio no encontrado');
        return rows[0];
    } catch (error) {
        console.error(`Error al obtener el servicio con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Crear un nuevo servicio
const createServicio = async (descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'INSERT INTO servicio (Descripcion) VALUES (?)',
            [descripcion]
        );
        return { ServicioID: result.insertId, Descripcion: descripcion };
    } catch (error) {
        console.error('Error al crear el servicio:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Actualizar un servicio existente por su ID
const updateServicio = async (id, descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'UPDATE servicio SET Descripcion = ? WHERE ServicioID = ?',
            [descripcion, id]
        );
        if (result.affectedRows === 0) throw new Error('Servicio no encontrado o no actualizado');
        return true;
    } catch (error) {
        console.error(`Error al actualizar el servicio con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Eliminar un servicio por su ID
const deleteServicio = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query('DELETE FROM servicio WHERE ServicioID = ?', [id]);
        if (result.affectedRows === 0) throw new Error('Servicio no encontrado o no eliminado');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el servicio con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

module.exports = {
    getAllServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
};
