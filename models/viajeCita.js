const MySQLConnection = require('../database/mysql');

const getCitasForViajes = async () => {
  let connection;
  try {
    connection = await MySQLConnection();
    const [rows, fields] = await connection.execute(`
        SELECT Cita.idCita, Paciente.idPaciente,
               CONCAT(Persona.Nombre, ' ', Persona.Apellido1) AS Paciente,
               Cita.ubicacionOrigen,
               Cita.idUbicacionDestino,
               Cita.condicionCita,
               Cita.estadoCita,
               Cita.fechaCita, 
               Cita.horaCita,
               Paciente.Traslado,
               Cita.camilla
        FROM Cita
        INNER JOIN 
               Paciente ON Cita.idPaciente = Paciente.IdPaciente
        INNER JOIN 
               Persona ON Paciente.IdPersona = Persona.Id;
    `);

    if (rows.length === 0) {
        console.log('No se encontraron citas');
        return { success: false, message: 'No se encontraron citas' };
    } else {
        console.log('Citas obtenidas exitosamente');
        return { success: true, citas: rows };
    }

  } catch (error) {
    console.error('Error al obtener las citas:', error);
    throw new Error('Error al obtener las citas');
  } finally {
    if (connection) await connection.end();
  }
}

module.exports = { getCitasForViajes };