const MySQLConnection = require('../database/mysql');

const createCita = async (citaData) => {
  let connection;
  try {
    connection = await MySQLConnection();
    const [result] = await connection.execute('INSERT INTO Cita (idPaciente, idAcompanante1, idAcompanante2, idUbicacionDestino, idEspecialidad, ubicacionOrigen, prioridad, camilla, condicionCita, diagnostico, fechaCita, horaCita, ausente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      citaData.idPaciente,
      citaData.idAcompanante1 || null,
      citaData.idAcompanante2 || null,
      citaData.idUbicacionDestino,
      citaData.idEspecialidad,
      citaData.ubicacionOrigen,
      citaData.prioridad,
      citaData.camilla,
      citaData.condicionCita,
      citaData.diagnostico,
      citaData.fechaCita,
      citaData.horaCita,
      citaData.ausente || null
    ]);

    if (result.affectedRows === 1) {
      return { success: true, message: 'Cita creada con éxito.', citaId: result.insertId };
    } else {
      return { success: false, message: 'No se pudo crear la cita.' };
    }
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

const obtenerCitas = async () => {
  let connection;
  try {
    connection = await MySQLConnection();
    const [results] = await connection.execute(`
      SELECT 
        Cita.idCita,
        CONCAT(PacientePersona.Nombre, ' ', PacientePersona.Apellido1, ' ', PacientePersona.Apellido2) AS nombreCompletoPaciente,
        CONCAT(A1.Nombre, ' ', A1.Apellido1, ' ', A1.Apellido2) AS nombreCompletoAcompanante1,
        CONCAT(A2.Nombre, ' ', A2.Apellido1, ' ', A2.Apellido2) AS nombreCompletoAcompanante2,
        Cita.ubicacionOrigen,
        Cita.idUbicacionDestino,
        destino.Descripcion AS ubicacionDestino, 
        servicio.Descripcion AS especialidad,
        Cita.camilla,
        Cita.prioridad,
        Cita.condicionCita,
        Cita.diagnostico,
        Cita.estadoCita,
        Cita.fechaCita,
        Cita.horaCita,
        Cita.ausente
      FROM 
        Cita
      JOIN 
        Paciente ON Cita.idPaciente = Paciente.IdPaciente
      JOIN 
        Persona AS PacientePersona ON Paciente.IdPersona = PacientePersona.Id
      LEFT JOIN 
        Acompanante A1 ON Cita.idAcompanante1 = A1.IdAcompanante
      LEFT JOIN 
        Acompanante A2 ON Cita.idAcompanante2 = A2.IdAcompanante
      JOIN 
        destino ON Cita.idUbicacionDestino = destino.IdDestino
      JOIN 
        servicio ON Cita.idEspecialidad = servicio.ServicioID;
    `);

    const citasFormateadas = results.map(cita => {
      cita.fechaCita = cita.fechaCita.toISOString().split('T')[0];
      return cita;
    });

    return citasFormateadas;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

const eliminarCita = async (idCita) => {
  let connection;
  try {
    connection = await MySQLConnection();
    console.log(`idCita models delete: ${idCita}`);
    const [rows, fields] = await connection.execute('DELETE FROM Cita WHERE idCita = ?', [idCita]);
    console.log('La Cita se elimino exitosamente');
    return rows;
  } catch (error) {
    console.error('Error al eliminar la Cita:', error);
    throw new Error('Error al eliminar la Cita');
  } finally {
    if (connection) await connection.end();
  }
};

const actualizarCita = async (idCita, datosCita) => {
  let connection;
  try {
    connection = await MySQLConnection();
    
    const campos = [];
    const valores = [];

    if (datosCita.ubicacionOrigen !== undefined) {
      campos.push('ubicacionOrigen = ?');
      valores.push(datosCita.ubicacionOrigen);
    }
    if (datosCita.camilla !== undefined) {
      campos.push('camilla = ?');
      valores.push(datosCita.camilla);
    }
    if (datosCita.prioridad !== undefined) {
      campos.push('prioridad = ?');
      valores.push(datosCita.prioridad);
    }
    if (datosCita.condicionCita !== undefined) {
      campos.push('condicionCita = ?');
      valores.push(datosCita.condicionCita);
    }
    if (datosCita.diagnostico !== undefined) {
      campos.push('diagnostico = ?');
      valores.push(datosCita.diagnostico);
    }
    if (datosCita.estadoCita !== undefined) {
      campos.push('estadoCita = ?');
      valores.push(datosCita.estadoCita);
    }
    if (datosCita.fechaCita !== undefined) {
      campos.push('fechaCita = ?');
      valores.push(datosCita.fechaCita);
    }
    if (datosCita.horaCita !== undefined) {
      campos.push('horaCita = ?');
      valores.push(datosCita.horaCita);
    }
    if (datosCita.ausente) {
      campos.push('ausente = ?');
      valores.push(datosCita.ausente);
    }

    valores.push(idCita);

    const query = `
      UPDATE Cita
      SET ${campos.join(', ')}
      WHERE idCita = ?
    `;

    const [result] = await connection.execute(query, valores);

    if (result.affectedRows === 0) {
      throw new Error('No se encontró la cita con el ID proporcionado');
    }

    return { message: 'Cita actualizada correctamente' };
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = { createCita, eliminarCita, actualizarCita, obtenerCitas };
