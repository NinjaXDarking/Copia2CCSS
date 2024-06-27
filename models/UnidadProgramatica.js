// models/UnidadProgramatica.js
const MySQLConnection = require('../database/mysql');

// Obtener todas las unidades programáticas
const getAllUnidadesProgramaticas = async () => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM UnidadProgramatica');
        return rows;
    } catch (error) {
        console.error('Error al obtener todas las unidades programáticas:', error);
        throw error;
    } finally {
        if (connection) await connection.end(); // Asegura cerrar la conexión
    }
};

module.exports = {
    getAllUnidadesProgramaticas
};
