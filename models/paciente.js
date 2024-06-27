const MySQLConnection = require('../database/mysql');

const getAllPacientes = async () => {
  try {
    const connection = await MySQLConnection();
    const [pacientes] = await connection.execute('SELECT P.*, PA.* FROM Paciente PA INNER JOIN Persona P ON PA.IdPersona = P.Id');
    return pacientes;
  } catch (error) {
    console.error('Error al obtener todos los pacientes:', error);
    throw new Error('Error al obtener todos los pacientes');
  }
};
const getPaciente = async (idPaciente) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el paciente existe
    const [existingRows] = await connection.execute('SELECT * FROM Paciente WHERE IdPaciente = ?', [idPaciente]);
    if (existingRows.length <= 0) {
      throw new Error('No existe un paciente con ese id');
    }
    const [paciente] = await connection.execute('SELECT P.*, PA.* FROM Paciente PA INNER JOIN Persona P ON PA.IdPersona = P.Id WHERE IdPaciente = ?', [idPaciente]);
    return paciente;
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    throw new Error('Error al obtener el paciente, ' + error.message);
  }
};
const getPacienteAcompanante = async (identificacion) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si la persona existe
    const [rowsPersona] = await connection.execute('SELECT * FROM Persona WHERE Identificacion = ?', [identificacion]);
    if (rowsPersona.length <= 0) {
      throw new Error('No existe un persona con esa identificación');
    }

    const [paciente] = await connection.execute('SELECT P.*, PA.* FROM Paciente PA INNER JOIN Persona P ON PA.IdPersona = P.Id WHERE Id = ?', [rowsPersona[0].Id]);
    if (paciente.length <= 0) {
      throw new Error('Esta persona no es un paciente');
    }

    const [acompanante] = await connection.execute('SELECT *  FROM Acompanante WHERE IdPaciente = ?', [paciente[0].IdPaciente]);
    const acompanantes = acompanante.length > 0 ? acompanante : null;

    // Combinar resultados en un solo objeto
    const resultado = {
      paciente,
      acompanantes
    };
    return resultado;
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    throw new Error('Error al obtener el paciente, ' + error.message);
  }
};

const getAllPacienteAcompanante = async () => {
  try {
    const connection = await MySQLConnection();

    const [pacientesData] = await connection.execute('SELECT P.*, PA.* FROM Paciente PA INNER JOIN Persona P ON PA.IdPersona = P.Id');
    const [acompanantesData] = await connection.execute('SELECT A.* FROM Acompanante A');
    if (pacientesData.length == 0) {
      throw new Error('No se encontraron pacientes.');
    }

    const pacientesConAcompanantes = [];
    // Map para agrupar pacientes con sus acompañantes
    pacientesData.forEach((paciente) => {
      const nuevoPaciente = {
        ...paciente,
        acompanantes: []
      };

      // Filtrar acompañantes del paciente actual y añadirlos
      const acompanantesPaciente = acompanantesData.filter(a => a.IdPaciente === paciente.IdPaciente);
      acompanantesPaciente.forEach((acompanante) => {
        nuevoPaciente.acompanantes.push({
          ...acompanante
        });
      });

      pacientesConAcompanantes.push(nuevoPaciente);
    });

    return { message: 'Pacientes obtenidos exitosamente', pacientes: pacientesConAcompanantes };
  } catch (error) {
    console.error('Error al obtener los pacientes:', error);
    throw new Error('Error al obtener los pacientes, ' + error.message);
  }
};


const deletePaciente = async (idPaciente) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el paciente existe
    const [existingRows] = await connection.execute('SELECT * FROM Paciente WHERE IdPaciente = ?', [idPaciente]);
    if (existingRows.length <= 0) {
      throw new Error('No existe un paciente con ese id');
    }

    // Ejecutar la consulta SQL de actualización
    const [rows, fields] = await connection.execute('UPDATE Paciente SET Estado = ? WHERE IdPaciente = ?', ["Inactivo", idPaciente]);
    console.log('El paciente se eliminó exitosamente');
    return rows;
  } catch (error) {
    console.error('Error al eliminar el paciente:', error);
    throw new Error('Error al eliminar el paciente, ' + error.message);
  }
};

module.exports = { deletePaciente };


const createPaciente = async (pacienteData) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el número de IdPersona ya existe en la tabla Persona
    const [existingRows] = await connection.execute('SELECT * FROM Persona WHERE Id = ?', [pacienteData.IdPersona]);
    if (existingRows.length <= 0) {
      throw new Error('No existe una persona con ese número de Id para asociarla como paciente');
    }
    // Verificar si el número de id ya existe en paciente
    const [existing1Rows] = await connection.execute('SELECT * FROM Paciente WHERE IdPersona = ?', [pacienteData.IdPersona]);
    if (existing1Rows.length > 0) {
      throw new Error('Ya existe una persona con ese id agregado de paciente');
    }

    const [rows, fields] = await connection.execute('INSERT INTO Paciente (IdPersona, Criticidad, Encamado, Traslado, Estado, Prioridad) VALUES (?, ?, ?, ?, ?, ?)', [
      pacienteData.IdPersona,
      pacienteData.Criticidad,
      pacienteData.Encamado,
      pacienteData.Traslado,
      pacienteData.Estado || 'Activo', // Por defecto, el estado será "Activo"
      pacienteData.Prioridad == 'true' ? 1 : 0
    ]);

    console.log('El paciente se creó correctamente');
    return rows;
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    throw new Error('Error al crear el paciente, ' + error.message);
  }
};

const updatePaciente = async (idPaciente, newData) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el id del paciente existe
    const [existingRows] = await connection.execute('SELECT * FROM Paciente WHERE IdPaciente = ?', [idPaciente]);
    if (existingRows.length <= 0) {
      throw new Error('No existe un paciente con ese número de Id para actualizar');
    }

    // Verificar si la persona es paciente
    const [existingRows1] = await connection.execute('SELECT * FROM Paciente WHERE IdPersona = ?', [newData.IdPersona]);
    if (existingRows1.length > 0 && existingRows1[0].IdPaciente != idPaciente) {
      throw new Error('Ya existe un paciente con ese número de Id de Persona');
    }


    // Verificar si el número de IdPersona existe en la tabla Persona
    const [existingRowsPersona] = await connection.execute('SELECT * FROM Persona WHERE Id = ?', [newData.IdPersona]);
    if (existingRowsPersona.length <= 0) {
      throw new Error('No existe una persona con ese número de Id para asociarla como paciente');
    }

    // Construir la consulta SQL de actualización con los nombres de las columnas y valores
    const updateQuery = 'UPDATE Paciente SET IdPersona = ?, Criticidad = ?, Encamado = ?, Traslado = ?, Estado = ?, Prioridad = ? WHERE IdPaciente = ?';

    // Obtener los valores de los campos de newData en el orden correcto
    const values = [
      newData.IdPersona,
      newData.Criticidad,
      newData.Encamado,
      newData.Traslado,
      newData.Estado || 'Activo', // Por defecto, el estado será "Activo"
      newData.Prioridad == 'true' ? 1 : 0,
      idPaciente
    ];

    // Ejecutar la consulta SQL de actualización
    const [rows, fields] = await connection.execute(updateQuery, values);
    console.log('El paciente se actualizó exitosamente');
    return rows;
  } catch (error) {
    console.error('Error al actualizar el paciente:', error);
    throw new Error('Error al actualizar el paciente, ' + error.message);
  }
};

module.exports = { getAllPacientes, getAllPacienteAcompanante, getPacienteAcompanante, getPaciente, deletePaciente, createPaciente, updatePaciente };
