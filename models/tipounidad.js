const MySQLConnection = require('../database/mysql');

//CREAR TIPO RECURSO.
const createTipoUnidad = async (unidadData) => {
  try {
    const connection = await MySQLConnection();
    const [rows, fields] = await connection.execute(
      'INSERT INTO TipoUnidad (tipo) VALUES (?)', [
      unidadData.tipo,
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
    const [tipounidad] = await connection.execute('DELETE FROM TipoUnidad WHERE idTipoUnidad = ?', [id]);
    if (tipounidad.affectedRows === 0) {
      throw new Error('No se encontró el tipo de unidad con el ID proporcionado');
    }
    console.log('El tipo de unidad se eliminó correctamente');
    return tiporecurso;
  } catch (error) {
    console.error('Error al eliminar el tipo de unidad:', error);
    throw new Error('Error al eliminar el tipo de unidad');
  }
};

const updateEstadoUnidadById = async (idEstado, estadoUnidadData) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute(
      'UPDATE EstadoUnidad SET estado = ? WHERE idEstado = ?',
      [
        estadoUnidadData.estado,
        idEstado
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el estado de unidad con el ID proporcionado');
    }
    console.log('El estado de unidad se actualizó correctamente');
    return result;
  } catch (error) {
    console.error('Error al actualizar el estado de unidad:', error);
    throw new Error('Error al actualizar el estado de unidad');
  }
};

module.exports = { createTipoUnidad, getAllTipoUnidad, deleteTipoUnidadById, updateEstadoUnidadById };