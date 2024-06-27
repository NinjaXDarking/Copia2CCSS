const MySQLConnection = require('../database/mysql');

// const getAllAcompanante = async () => {
//   try {
//     const connection = await MySQLConnection();
//     const [acompanante] = await connection.execute('SELECT * FROM Acompanante');
//     return acompanante;
//   } catch (error) {
//     console.error('Error al obtener todos los acompañantes:', error);
//     throw new Error('Error al obtener todos los acompañantes');
//   }
// };

const getAllAcompanante = async () => {
  try {
    const connection = await MySQLConnection();
    const [acompanante] = await connection.execute('SELECT *  FROM Acompanante ');
    return acompanante;
  } catch (error) {
    console.error('Error al obtener todos los acompañantes:', error);
    throw new Error('Error al obtener todos los acompañantes');
  }
};

const getAcompanante = async (idAcompanante) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si existe el acompañante
    const [existing1Rows] = await connection.execute('SELECT * FROM Acompanante WHERE IdAcompanante = ?', [idAcompanante]);
    if (existing1Rows.length <= 0) {
      throw new Error('No existe ese id en acompañante');
    }

    const [acompanante] = await connection.execute('SELECT *  FROM Acompanante WHERE IdAcompanante = ?', [idAcompanante]);
    return acompanante;
  } catch (error) {
    console.error('Error al obtener el acompañante:', error);
    throw new Error('Error al obtener el acompañante:, ' + error.message);
  }
};


const deleteAcompanante = async (idAcompanante) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el número de id ya existe en acompañante
    const [existing1Rows] = await connection.execute('SELECT * FROM Acompanante WHERE IdAcompanante = ?', [idAcompanante]);
    if (existing1Rows.length <= 0) {
      throw new Error('No existe una persona con ese id como acompañante');
    }
    // const [rows, fields] = await connection.execute('DELETE FROM Acompanante WHERE IdPersona = ?', [idPersona]);

    // Ejecutar la consulta SQL de actualización
    const [rows, fields] = await connection.execute('UPDATE Acompanante SET Estado = ? WHERE IdAcompanante = ?', ["Inactivo", idAcompanante]);
    console.log('El acompañante se elimino exitosamente');
    return rows;
  } catch (error) {
    console.error('Error al eliminar el acompañante:', error);
    throw new Error('Error al eliminar el acompañante, ' + error.message);
  }
}


const createAcompanante = async (acompananteData) => {
  try {
    const connection = await MySQLConnection();

    // Verificar que exista el paciente para luego registrar los acompañantes
    const [existing1Rows] = await connection.execute('SELECT * FROM Paciente WHERE IdPaciente = ?', [acompananteData.IdPaciente]);
    if (existing1Rows.length <= 0) {
      throw new Error('No existe un paciente con ese id');
    }

    // Verificar que solo pueda registrar maximo 2 acompañantes. 
    const [existingRows] = await connection.execute('SELECT * FROM Acompanante WHERE IdPaciente = ?', [acompananteData.IdPaciente]);
    if (existingRows.length >= 2) {
      throw new Error('No puede registrar más de 2 acompañantes a ese paciente');
    }

    // Verificar que solo pueda registrar maximo 2 acompañantes. 
    const [existingRows1] = await connection.execute('SELECT * FROM Acompanante WHERE IdPaciente = ? AND Identificacion = ?', [acompananteData.IdPaciente, acompananteData.Identificacion ]);
    if (existingRows1.length > 0) {
      throw new Error('No puede registrar 2 veces el mismo acompañante para el mismo paciente');
    }

    const [rows, fields] = await connection.execute('INSERT INTO Acompanante (IdPaciente ,Identificacion, Nombre, Apellido1, Apellido2, Parentesco,Telefono1,Telefono2, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      acompananteData.IdPaciente,
      acompananteData.Identificacion,
      acompananteData.Nombre,
      acompananteData.Apellido1,
      acompananteData.Apellido2,
      acompananteData.Parentesco,
      acompananteData.Telefono1,
      acompananteData.Telefono2,
      acompananteData.Estado
    ]);

    console.log('El acompañante se creó correctamente');
    return rows;
  } catch (error) {
    console.error('Error al crear al acompañante:', error);
    throw new Error('Error al crear al acompañante, ' + error.message);
  }
};


const updateAcompanante = async (idAcompanante, newData) => {
  try {
    const connection = await MySQLConnection();

    // Verificar que exista el paciente para luego registrar los acompañantes
    const [existing1Rows] = await connection.execute('SELECT * FROM Paciente WHERE IdPaciente = ?', [ newData.IdPaciente]);
    if (existing1Rows.length <= 0) {
      throw new Error('No existe un paciente con ese id');
    }

    // Verificar que solo pueda registrar maximo 2 acompañantes. 
    const [existingRows1] = await connection.execute('SELECT * FROM Acompanante WHERE IdPaciente = ? AND Identificacion = ?', [ newData.IdPaciente,  newData.Identificacion ]);
    if (existingRows1.length > 0) {
      throw new Error('No puede agregarle 2 veces el mismo acompañante para el mismo paciente');
    }

    // Construir la consulta SQL de actualización con los nombres de las columnas y valores
    const updateQuery = 'UPDATE Acompanante SET IdPaciente = ?, Identificacion = ?, Nombre = ?, Apellido1 = ?, Apellido2 = ?, Parentesco = ?,Telefono1 = ?,Telefono2 = ?, Estado = ? WHERE IdAcompanante = ?';

    // Obtener los valores de los campos de newData en el orden correcto
    const values = [
      newData.IdPaciente,
      newData.Identificacion,
      newData.Nombre,
      newData.Apellido1,
      newData.Apellido2,
      newData.Parentesco,
      newData.Telefono1,
      newData.Telefono2,
      newData.Estado,
      idAcompanante
    ];

    // Ejecutar la consulta SQL de actualización
    const [rows, fields] = await connection.execute(updateQuery, values);
    console.log('El acompañante se actualizó exitosamente');
    return rows;
  } catch (error) {
    console.error('Error al actualizar el acompañante:', error);
    throw new Error('Error al actualizar el acompañante, ' + error.message);
  }
};





module.exports = { getAllAcompanante, getAcompanante, deleteAcompanante, createAcompanante, updateAcompanante };
