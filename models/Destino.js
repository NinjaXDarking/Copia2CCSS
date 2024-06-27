// models/Destino.js
const MySQLConnection = require('../database/mysql');

// Obtener todos los destinos
const getAllDestinos = async () => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM destino');
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los destinos:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Obtener un destino por ID
const getDestinoById = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM destino WHERE IdDestino = ?', [id]);
        if (rows.length === 0) throw new Error('Destino no encontrado');
        return rows[0];
    } catch (error) {
        console.error(`Error al obtener el destino con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Crear un nuevo destino
const createDestino = async (id, descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        await connection.query(
            'INSERT INTO destino (IdDestino, Descripcion) VALUES (?, ?)',
            [id, descripcion]
        );
        return { IdDestino: id, Descripcion: descripcion };
    } catch (error) {
        console.error('Error al crear el destino:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Actualizar un destino existente por su ID
const updateDestino = async (id, descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'UPDATE destino SET Descripcion = ? WHERE IdDestino = ?',
            [descripcion, id]
        );
        if (result.affectedRows === 0) throw new Error('Destino no encontrado o no actualizado');
        return true;
    } catch (error) {
        console.error(`Error al actualizar el destino con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Eliminar un destino por su ID
const deleteDestino = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query('DELETE FROM destino WHERE IdDestino = ?', [id]);
        if (result.affectedRows === 0) throw new Error('Destino no encontrado o no eliminado');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el destino con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

module.exports = {
    getAllDestinos,
    getDestinoById,
    createDestino,
    updateDestino,
    deleteDestino
};
