const MySQLConnection = require('../database/mysql');

//CREAR TIPO RECURSO.
const createTipoRecurso = async (recursoData) => {
    try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute(
        'INSERT INTO TipoRecurso (idTipoRecurso, recurso) VALUES (?, ?)', [
          recursoData.idTipoRecurso,
          recursoData.recurso,
        ]
      );
      console.log('El tipo de recurso se creó correctamente');
      return rows;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('El idTipoRecurso ya existe');
    } else {
        console.error('Error al crear el tipo de recurso:', error);
        throw new Error('Error al crear el tipo de recurso');
      }
    }
  };

  const getAllTipoRecursos = async () => {
    try {
      const connection = await MySQLConnection();
      const [tiporecurso] = await connection.execute('SELECT * FROM TipoRecurso');
      return tiporecurso;
    } catch (error) {
      console.error('Error al obtener todos los tipos de recursos:', error);
      throw new Error('Error al obtener todos los tipos de recursos');
    }
  };

// Obtener recursos por idTipoRecurso
const getRecursosByID= async (idTipoRecurso) => {
    try {
      const connection = await MySQLConnection();
      const [tiporecurso] = await connection.execute('SELECT * FROM TipoRecurso WHERE idTipoRecurso= ?', [idTipoRecurso]);
      return tiporecurso;
    } catch (error) {
      console.error('Error al obtener el recurso por tipo:', error);
      throw new Error('Error al obtener los recursos por tipo');
    }
  };

  // BORRAR POR ID
const deleteTipoRecursoById = async (id) => {
  try {
    const connection = await MySQLConnection();
    const [tiporecurso] = await connection.execute('DELETE FROM TipoRecurso WHERE idTipoRecurso = ?', [id]);
    if (tiporecurso.affectedRows === 0) {
      throw new Error('No se encontró el tipo de recurso con el ID proporcionado');
    }
    console.log('El tipo de recurso se eliminó correctamente');
    return tiporecurso;
  } catch (error) {
    console.error('Error al eliminar el tipo de recurso:', error);
    throw new Error('Error al eliminar el tipo de recurso');
  }
};

const updateTipoRecursoById = async (id, recursoData) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute(
      'UPDATE TipoRecurso SET recurso = ? WHERE idTipoRecurso = ?',
      [
        recursoData.recurso,
        id
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el tipo de recurso con el ID proporcionado');
    }
    console.log('El tipo de recurso se actualizó correctamente');
    return result;
  } catch (error) {
    console.error('Error al actualizar el tipo de recurso:', error);
    throw new Error('Error al actualizar el tipo de recurso');
  }
};


  module.exports = { createTipoRecurso, getAllTipoRecursos, getRecursosByID, deleteTipoRecursoById, updateTipoRecursoById };