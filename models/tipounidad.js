const MySQLConnection = require('../database/mysql');

//CREAR TIPO RECURSO.
const createTipoUnidad = async (unidadData) => {
  try {
    const connection = await MySQLConnection();
    const [rows, fields] = await connection.execute(
      'INSERT INTO TipoUnidad (tipo, capacidad) VALUES (?, ?)', [
      unidadData.tipo,
      unidadData.capacidad
    ]
    );
    console.log('El tipo de unidad se creó correctamente');
    return rows;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('El idTipoUnidad ya existe');
    } else {
      console.error('Error al crear el tipo de unidad:', error);
      throw new Error('Error al crear el tipo de unidad');
    }
  }
};

const getAllTipoUnidad = async () => {
  try {
    const connection = await MySQLConnection();
    const [tipoUnidad] = await connection.execute('SELECT * FROM TipoUnidad');
    return tipoUnidad;
  } catch (error) {
    console.error('Error al obtener todos los tipos de unidad:', error);
    throw new Error('Error al obtener todos los tipos de unidad');
  }
};

// BORRAR POR ID
const deleteTipoUnidadById = async (id) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute('DELETE FROM TipoUnidad WHERE idTipoUnidad = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el tipo de unidad con el ID proporcionado');
    }
    console.log('El tipo de unidad se eliminó correctamente');
    return result;
  } catch (error) {
    console.error('Error al eliminar el tipo de unidad:', error);
    throw new Error('Error al eliminar el tipo de unidad');
  }
};

const updateTipoUnidadById = async (idTipoUnidad, tipoUnidadData) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute(
      'UPDATE TipoUnidad SET tipo = ?, capacidad = ? WHERE idTipoUnidad = ?',
      [
        tipoUnidadData.tipo,
        tipoUnidadData.capacidad,
        idTipoUnidad
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el tipo de unidad con el ID proporcionado');
    }
    console.log('El tipo de unidad se actualizó correctamente');
    return result;
  } catch (error) {
    console.error('Error al actualizar el tipo de unidad:', error);
    throw new Error('Error al actualizar el tipo de unidad');
  }
};

module.exports = { createTipoUnidad, getAllTipoUnidad, deleteTipoUnidadById, updateTipoUnidadById };