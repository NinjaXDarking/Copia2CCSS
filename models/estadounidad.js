const MySQLConnection = require('../database/mysql');

const createEstadoUnidad = async (estadoUnidadData) => {
    try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute(
        'INSERT INTO EstadoUnidad (idEstado, estado) VALUES (?, ?)', [
          estadoUnidadData.idEstado,
          estadoUnidadData.estado,
        ]
      );
      console.log('El estado de unidad se creó correctamente');
      return rows;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('El idEstado ya existe');
      } else {
        console.error('Error al crear el estado de unidad:', error);
        throw new Error('Error al crear el estado de unidad');
      }
    }
  };

  const getAllEstadosUnidad = async () => {
    try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute('SELECT * FROM EstadoUnidad');
      return rows;
    } catch (error) {
      console.error('Error al obtener los estados de unidad:', error);
      throw new Error('Error al obtener los estados de unidad');
    }
  };

  const getEstadoUnidadByID = async (idEstado) => {
    try {
      const connection = await MySQLConnection();
      const [estadoUnidad] = await connection.execute('SELECT * FROM EstadoUnidad WHERE idEstado = ?', [idEstado]);
      if (estadoUnidad.length === 0) {
        throw new Error('No se encontró el estado de unidad con el ID proporcionado');
      }
      return estadoUnidad[0];
    } catch (error) {
      console.error('Error al obtener el estado de unidad:', error);
      throw new Error('Error al obtener el estado de unidad');
    }
  };


  const deleteEstadoUnidadById = async (idEstado) => {
    try {
      const connection = await MySQLConnection();
      const [result] = await connection.execute('DELETE FROM EstadoUnidad WHERE idEstado = ?', [idEstado]);
      if (result.affectedRows === 0) {
        throw new Error('No se encontró el estado de unidad con el ID proporcionado');
      }
      return result;
    } catch (error) {
      console.error('Error al eliminar el estado de unidad:', error);
      throw new Error('Error al eliminar el estado de unidad');
    }
  };

  const updateEstadoUnidadById = async (idEstado, estadoUnidadData) => {
    try {
      const connection = await MySQLConnection();
      const [result] = await connection.execute(
        'UPDATE EstadoUnidad SET idEstado = ?, estado = ? WHERE idEstado = ?',
        [
          estadoUnidadData.idEstado, 
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

  module.exports={createEstadoUnidad, getAllEstadosUnidad, getEstadoUnidadByID, deleteEstadoUnidadById, updateEstadoUnidadById};