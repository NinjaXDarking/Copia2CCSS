const MySQLConnection = require('../database/mysql');

const getAllPersona = async () => {
  try {
    const connection = await MySQLConnection();
    const [personas] = await connection.execute('SELECT * FROM Persona');
    return personas;
  } catch (error) {
    console.error('Error al obtener todas las personas:', error);
    throw new Error('Error al obtener todas las personas');
  }
};

const getPersona = async (idPersona) => {
  try {
    const connection = await MySQLConnection();
    // Verificar si el número de id ya existe
    const [existingRows] = await connection.execute('SELECT * FROM Persona WHERE Id = ?', [idPersona]);
    if (existingRows.length <= 0) {
      throw new Error('No existe una persona con ese número de id');
    }

    const [persona] = await connection.execute('SELECT * FROM Persona WHERE Id = ?', [idPersona]);
    return persona;
  } catch (error) {
    console.error('Error al obtener la persona:', error);
    throw new Error('Error al obtener la persona, '+ error.message);
  }
};

const deletePersona = async (idPersona) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el número de id ya existe
    const [existingRows] = await connection.execute('SELECT * FROM Persona WHERE Id = ?', [idPersona]);
    if (existingRows.length <= 0) {
      throw new Error('No existe una persona con ese número de id para eliminar');
    }
    console.log(`IdPersona models delete: ${idPersona}`);
    const [rows, fields] = await connection.execute('DELETE FROM Persona WHERE id = ?', [idPersona]);
    console.log('La persona se eliminó exitosamente');
    return rows;
  } catch (error) {
    console.error('Error al eliminar la persona:', error);
    throw new Error('Error al eliminar la persona, ' + error.message);
  }
}

const createPersona = async (personaData) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el número de identificación ya existe
    const [existingRows] = await connection.execute('SELECT * FROM Persona WHERE Identificacion = ?', [personaData.Identificacion]);
    if (existingRows.length > 0) {
      throw new Error('Ya existe una persona con ese número de identificación');
    }
    const [rows, fields] = await connection.execute('INSERT INTO Persona (Nombre, Apellido1, Apellido2, Identificacion, Tipo_identificacion, Genero, Telefono1, Telefono2, Tipo_seguro, Direccion, Latitud, Longitud, Tipo_sangre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      personaData.Nombre,
      personaData.Apellido1,
      personaData.Apellido2,
      personaData.Identificacion,
      personaData.Tipo_identificacion,
      personaData.Genero,
      personaData.Telefono1,
      personaData.Telefono2,
      personaData.Tipo_seguro,
      personaData.Direccion,
      personaData.Latitud,
      personaData.Longitud,
      personaData.Tipo_sangre
    ]);
    console.log('La persona se creó correctamente');
    return rows;
  } catch (error) {
    console.error('Error al crear la persona:', error);
    throw new Error('Error al crear la persona, ' + error.message);
  }
};

const updatePersona = async (idPersona, newData) => {
  try {
    const connection = await MySQLConnection();

    // Verificar si el número de id ya existe
    const [existingRows] = await connection.execute('SELECT * FROM Persona WHERE Id = ?', [idPersona]);
    if (existingRows.length <= 0) {
      throw new Error('No existe una persona con ese número de id para actualizar');
    }

    // Construir la consulta SQL de actualización con los nombres de las columnas y valores
    const updateQuery = 'UPDATE Persona SET Nombre = ?, Apellido1 = ?, Apellido2 = ?, Identificacion = ?, Tipo_identificacion = ?, Genero = ?, Telefono1 = ?, Telefono2 = ?, Tipo_seguro = ?, Direccion = ?, Latitud = ?, Longitud = ? , Tipo_sangre = ? WHERE Id = ?';

    // Obtener los valores de los campos de newData en el orden correcto
    const values = [
      newData.Nombre,
      newData.Apellido1,
      newData.Apellido2,
      newData.Identificacion,
      newData.Tipo_identificacion,
      newData.Genero,
      newData.Telefono1,
      newData.Telefono2,
      newData.Tipo_seguro,
      newData.Direccion,
      newData.Latitud,
      newData.Longitud,
      newData.Tipo_sangre,
      idPersona
    ];

    // Ejecutar la consulta SQL de actualización
    const [rows, fields] = await connection.execute(updateQuery, values);
    console.log('La persona se actualizó exitosamente');
    return rows;


  } catch (error) {
    console.error('Error al actualizar la persona:', error);
    throw new Error('Error al actualizar la persona, ' + error.message);
  }
};

module.exports = { getAllPersona, getPersona, deletePersona, createPersona, updatePersona };
