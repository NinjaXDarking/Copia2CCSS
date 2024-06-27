// models/MotivoVale.js
const MySQLConnection = require('../database/mysql');

// Obtener todos los motivos
const getAllMotivos = async () => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM MotivoVale');
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los motivos:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Obtener un motivo por ID
const getMotivoById = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM MotivoVale WHERE id = ?', [id]);
        if (rows.length === 0) throw new Error('Motivo no encontrado');
        return rows[0];
    } catch (error) {
        console.error(`Error al obtener el motivo con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Crear un nuevo motivo
const createMotivo = async (descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'INSERT INTO MotivoVale (descripcion) VALUES (?)',
            [descripcion]
        );
        return { id: result.insertId, descripcion };
    } catch (error) {
        console.error('Error al crear el motivo:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Actualizar un motivo existente por su ID
const updateMotivo = async (id, descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'UPDATE MotivoVale SET descripcion = ? WHERE id = ?',
            [descripcion, id]
        );
        if (result.affectedRows === 0) throw new Error('Motivo no encontrado o no actualizado');
        return true;
    } catch (error) {
        console.error(`Error al actualizar el motivo con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Eliminar un motivo por su ID
const deleteMotivo = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query('DELETE FROM MotivoVale WHERE id = ?', [id]);
        if (result.affectedRows === 0) throw new Error('Motivo no encontrado o no eliminado');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el motivo con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

module.exports = {
    getAllMotivos,
    getMotivoById,
    createMotivo,
    updateMotivo,
    deleteMotivo
};
