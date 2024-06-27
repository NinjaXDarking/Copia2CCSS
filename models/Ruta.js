const MySQLConnection = require('../database/mysql');

// Obtener todas las rutas
const getAllRutas = async () => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM Ruta');
        return rows;
    } catch (error) {
        console.error('Error al obtener todas las rutas:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Obtener una ruta por ID
const getRutaById = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM Ruta WHERE IdRuta = ?', [id]);
        if (rows.length === 0) throw new Error('Ruta no encontrada');
        return rows[0];
    } catch (error) {
        console.error(`Error al obtener la ruta con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Crear una nueva ruta
const createRuta = async (id, descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        await connection.query(
            'INSERT INTO Ruta (IdRuta, Descripcion) VALUES (?, ?)',
            [id, descripcion]
        );
        return { IdRuta: id, Descripcion: descripcion };
    } catch (error) {
        console.error('Error al crear la ruta:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Actualizar una ruta existente por su ID
const updateRuta = async (id, descripcion) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'UPDATE Ruta SET Descripcion = ? WHERE IdRuta = ?',
            [descripcion, id]
        );
        if (result.affectedRows === 0) throw new Error('Ruta no encontrada o no actualizada');
        return true;
    } catch (error) {
        console.error(`Error al actualizar la ruta con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

// Eliminar una ruta por su ID
const deleteRuta = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query('DELETE FROM Ruta WHERE IdRuta = ?', [id]);
        if (result.affectedRows === 0) throw new Error('Ruta no encontrada o no eliminada');
        return true;
    } catch (error) {
        console.error(`Error al eliminar la ruta con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

module.exports = {
    getAllRutas,
    getRutaById,
    createRuta,
    updateRuta,
    deleteRuta
};
