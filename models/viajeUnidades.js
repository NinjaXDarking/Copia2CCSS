const MySQLConnection = require('../database/mysql');

const getUnidadesForViajes = async () => {
  let connection
  try {
    connection = await MySQLConnection();
    const [rows, fields] = await connection.execute(`
        SELECT 
        Unidad.id, 
        Unidad.numeroUnidad, 
        EstadoUnidad.estado,
        Chofer.idChofer,
        Chofer.nombre AS nombreChofer,
        Chofer.apellido1 AS apellido1Chofer
        FROM 
        Unidad
        INNER JOIN 
        EstadoUnidad ON Unidad.idEstado = EstadoUnidad.idEstado
        LEFT JOIN 
        Chofer ON Unidad.choferDesignado = Chofer.idChofer
        WHERE 
        EstadoUnidad.estado = 'activo';
    `);

    if (rows.length === 0) {
        console.log('No se encontraron unidades activas');
        return { success: false, message: 'No se encontraron unidades activas' };
    } else {
        console.log('Unidades obtenidas exitosamente');
        return { success: true, unidades: rows };
    }

  } catch (error) {
    console.error('Error al obtener las unidades:', error);
    throw new Error('Error al obtener las unidades');
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = { getUnidadesForViajes };