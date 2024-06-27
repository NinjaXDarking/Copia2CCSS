const MySQLConnection = require('../database/mysql');

const createEspecialidad = async (especialidadData) => {
  try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute('INSERT INTO EspecialidadMedica (especialidad) VALUES (?)', [
          especialidadData.especialidad
      ]);
      console.log('La especialidad se registro exitosamente');
      return rows;
  } catch (error) {
      console.error('Error al registrar la especialidad:', error);
      throw new Error('Error al registrar la especialidad');
  }
};

const getAllEspecialidad = async () => {
  try {
      const connection = await MySQLConnection();
      const [Especialidad] = await connection.execute('SELECT * FROM EspecialidadMedica');
      return Especialidad;
  } catch (error) {
      console.error('Error al obtener los datos de la tabla:', error);
      throw new Error('Error al obtener los datos de la tabla');
  }
};

const eliminateEspecialidad = async (idEspecialidad) => {
    try {
        const connection = await MySQLConnection();
        console.log(`id models delete: ${idEspecialidad}`);
        const [rows, fields] = await connection.execute('DELETE FROM EspecialidadMedica WHERE idEspecialidad = ?', [idEspecialidad]);
        console.log('La especialidad se elimino exitosamente');
      return rows;
    } catch (error) {
        console.error('Error al eliminar la especialidad:', error);
        throw new Error('Error al eliminar la especialidad');
    }
};

const updatingEspecialidad = async (idEspecialidad, especialidadData) => {
    try {
        const connection = await MySQLConnection();
        console.log(`id models update: ${idEspecialidad}`);
        console.log(`nuevos datos models:`, especialidadData);

        if (especialidadData.especialidad === undefined) {
            throw new Error('hay parámetros undefined en models');
        }

        const [rows, fields] = await connection.execute('UPDATE EspecialidadMedica SET especialidad = ? WHERE idEspecialidad = ?', 
        [especialidadData.especialidad, idEspecialidad]);
        console.log('La especialidad se actualizo exitosamente');
        return rows;
    } catch (error) {
        console.error('Error al actualizar la especialidad:', error);
        throw new Error('Error al actualizar la especialidad');
    }
};

module.exports = { createEspecialidad, getAllEspecialidad, eliminateEspecialidad, updatingEspecialidad};