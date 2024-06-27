const MySQLConnection = require('../database/mysql');

const getViajesForChofer = async () => {
  let connection;
  try {
    connection = await MySQLConnection();
    const [rows, fields] = await connection.execute(`
        SELECT 
        Viaje.idViaje,
        Viaje.idCita, 
        Viaje.idPaciente,
        CONCAT(Persona.Nombre, ' ', Persona.Apellido1) AS Paciente,
        Viaje.LugarSalida,
        Viaje.idUbicacionDestino,
        Viaje.horaCita,
        Cita.idAcompanante1,
        CONCAT(Acompanante1.Nombre, ' ', Acompanante1.Apellido1) AS Acompanante1,
        Cita.idAcompanante2,
        CONCAT(Acompanante2.Nombre, ' ', Acompanante2.Apellido1) AS Acompanante2
        FROM 
        Viaje
        INNER JOIN 
        Cita ON Viaje.idCita = Cita.idCita
        INNER JOIN 
        Paciente ON Cita.idPaciente = Paciente.IdPaciente
        INNER JOIN 
        Persona ON Paciente.IdPersona = Persona.Id
        LEFT JOIN 
        Acompanante AS Acompanante1 ON Cita.idAcompanante1 = Acompanante1.IdAcompanante
        LEFT JOIN 
        Acompanante AS Acompanante2 ON Cita.idAcompanante2 = Acompanante2.IdAcompanante;
    `);

    if (rows.length === 0) {
        console.log('No se encontraron viajes');
        return { success: false, message: 'No se encontraron viajes' };
    } else {
        console.log('Viajes obtenidos exitosamente');
        return { success: true, viajes: rows };
    }

  } catch (error) {
    console.error('Error al obtener los viajes:', error);
    throw new Error('Error al obtener los viajes');
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = { getViajesForChofer };