const MySQLConnection = require('../database/mysql');

const createEspecialidad = async (especialidadData) => {
    let connection;
    try {
      connection = await MySQLConnection();
      const [result] = await connection.execute('INSERT INTO EspecialidadMedica (Especialidad) VALUES (?)', [
        especialidadData.Especialidad
      ]);
  
      if (result.affectedRows === 1) {
        return { success: true, message: 'Especialidad Medica creada con éxito.', idEspecialidad: result.insertId };
      } else {
        return { success: false, message: 'No se pudo crear la especialidad medica.' };
      }
    } catch (error) {
      console.error('Error al crear especialidad medica:', error);
      throw error;
    } finally {
      if (connection) await connection.end();
    }
  };

const getAllEspecialidad = async () => {
  let connection;
  try {
      connection = await MySQLConnection();
      const [Especialidad] = await connection.execute('SELECT * FROM EspecialidadMedica');
      return Especialidad;
  } catch (error) {
    console.error('Error al obtener especialidad:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

const eliminarEspecialidad = async (idEspecialidad) => { 
  let connection;  
  try {
      connection = await MySQLConnection();
      console.log(`idEspecialidad models delete: ${idEspecialidad}`);
      const [rows, fields] = await connection.execute('DELETE FROM EspecialidadMedica WHERE idEspecialidad = ?',[idEspecialidad]);
      console.log('La especialidad se elimino exitosamente');
      return rows;
    } catch (error) {
        console.error('Error al eliminar la especialidad:', error);
        throw new Error('Error al eliminar la especialidad');
      } finally {
        if (connection) await connection.end();
      }
  };
  
  const updatingEspecialidad = async (idEspecialidad, especialidadData) => { 
    let connection;
    try {
      connection = await MySQLConnection();
      console.log(`idEspecialidad models update: ${idEspecialidad}`);
      console.log(`nuevos datos models:`, especialidadData);
  
      if (especialidadData.Especialidad === undefined) {
        throw new Error('hay parámetros undefined en models');
      }
  
      const [rows, fields] = await connection.execute(
        'UPDATE EspecialidadMedica SET Especialidad = ? WHERE idEspecialidad = ?', [especialidadData.Especialidad, idEspecialidad]
      );
      console.log('La especialidad se actualizo exitosamente');
      return rows;
    } catch (error) {
        console.error('Error al actualizar especialidad:', error);
        throw error;
      } finally {
        if (connection) await connection.end();
      }
  };

module.exports = { createEspecialidad, getAllEspecialidad, eliminarEspecialidad, updatingEspecialidad};