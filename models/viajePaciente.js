const MySQLConnection = require('../database/mysql');

const getPacientesForViajes = async () => {
  try {
    const connection = await MySQLConnection();
    const [rows, fields] = await connection.execute(`
        SELECT Paciente.IdPaciente, Persona.Nombre, Persona.Apellido1, Persona.Apellido2
        FROM Paciente
        INNER JOIN Persona ON Paciente.IdPersona = Persona.Id;
    `);

    if (rows.length === 0) {
        console.log('No se encontraron pacientes');
        return { success: false, message: 'No se encontraron pacientes' };
    } else {
        console.log('Pacientes obtenidos exitosamente');
        return { success: true, pacientes: rows };
    }

  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    throw new Error('Error al obtener los pacientes');
  }
}

module.exports = { getPacientesForViajes };