const MySQLConnection = require('../database/mysql');

const createFrecuenciaCambio = async (frecuenciaCambioData) => {
    try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute(
        'INSERT INTO FrecuenciaCambio (idFrecuenciaCambio, tipo, valor) VALUES (?, ?, ?)', [
          frecuenciaCambioData.idFrecuenciaCambio,
          frecuenciaCambioData.tipo,
          frecuenciaCambioData.valor,
        ]
      );
      console.log('La frecuencia de cambio se creó correctamente');
      return rows;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('El idFrecuenciaCambio ya existe');
      } else {
        console.error('Error al crear la frecuencia de cambio:', error);
        throw new Error('Error al crear la frecuencia de cambio');
      }
    }
  };

  const getAllFrecuenciaCambios = async () => {
    try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute('SELECT idFrecuenciaCambio, tipo, valor FROM FrecuenciaCambio');
      return rows;
    } catch (error) {
      console.error('Error al obtener las frecuencias de cambio:', error);
      throw new Error('Error al obtener las frecuencias de cambio');
    }
  };

  const getFrecuenciaCambioByID = async (idFrecuenciaCambio) => {
    try {
      const connection = await MySQLConnection();
      const [rows, fields] = await connection.execute(
        'SELECT idFrecuenciaCambio, tipo, valor FROM FrecuenciaCambio WHERE idFrecuenciaCambio = ?', 
        [idFrecuenciaCambio]
      );
      return rows[0];
    } catch (error) {
      console.error('Error al obtener la frecuencia de cambio:', error);
      throw new Error('Error al obtener la frecuencia de cambio');
    }
  };
  
  const deleteFrecuenciaCambioById = async (idFrecuenciaCambio) => {
    try {
      const connection = await MySQLConnection();
      const [result] = await connection.execute(
        'DELETE FROM FrecuenciaCambio WHERE idFrecuenciaCambio = ?', 
        [idFrecuenciaCambio]
      );
      return result;
    } catch (error) {
      console.error('Error al eliminar la frecuencia de cambio:', error);
      throw new Error('Error al eliminar la frecuencia de cambio');
    }
  };

  const updateFrecuenciaCambioById = async (idFrecuenciaCambio, frecuenciaCambioData) => {
    try {
      const connection = await MySQLConnection();
      const [result] = await connection.execute(
        'UPDATE FrecuenciaCambio SET tipo = ?, valor = ? WHERE idFrecuenciaCambio = ?', 
        [frecuenciaCambioData.tipo, frecuenciaCambioData.valor, idFrecuenciaCambio]
      );
      return result;
    } catch (error) {
      console.error('Error al actualizar la frecuencia de cambio:', error);
      throw new Error('Error al actualizar la frecuencia de cambio');
    }
  };
  module.exports = { createFrecuenciaCambio, getAllFrecuenciaCambios, getFrecuenciaCambioByID, deleteFrecuenciaCambioById, updateFrecuenciaCambioById};