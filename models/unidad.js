const MySQLConnection = require('../database/mysql');

//CREAR UNIDAD
const createUnidad = async (unidadData) => {
  try {
    const connection = await MySQLConnection();
    const [rows, fields] = await connection.execute('INSERT INTO Unidad (idTipoUnidad, idTipoRecurso, idFrecuenciaCambio, numeroUnidad, choferDesignado, fechaDekra, capacidadTotal, capacidadCamas, capacidadSillas, kilometrajeInicial, kilometrajeActual, adelanto, idEstado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      unidadData.idTipoUnidad,
      unidadData.idTipoRecurso,
      unidadData.idFrecuenciaCambio,
      unidadData.numeroUnidad,
      unidadData.choferDesignado,
      unidadData.fechaDekra,
      unidadData.capacidadTotal,
      unidadData.capacidadCamas,
      unidadData.capacidadSillas,
      unidadData.kilometrajeInicial,
      unidadData.kilometrajeActual,
      unidadData.adelanto,
      unidadData.idEstado,
    ]);
    console.log('La unidad se creó correctamente');
    return rows;
  } catch (error) {
    console.error('Error al crear la unidad:', error);
    throw new Error('Error al crear la unidad');
  } 
};



//OBTENER TODAS LAS UNIDADES
const getAllUnidades = async () => {
  try {
    const connection = await MySQLConnection();
    const [unidades] = await connection.execute('SELECT * FROM Unidad');
    return unidades;
  } catch (error) {
    console.error('Error al obtener todas las unidades:', error);
    throw new Error('Error al obtener todas las unidades');
  } 
};

//OBTENER POR TIPO
const getUnidadesByNumero = async (numeroUnidad) => {
  try {
    const connection = await MySQLConnection();
    const [unidades] = await connection.execute('SELECT * FROM Unidad WHERE numeroUnidad = ?', [numeroUnidad]);
    return unidades;
  } catch (error) {
    console.error('Error al obtener las unidades por numero de unidad:', error);
    throw new Error('Error al obtener las unidades por numero de unidad');
  } 
};

//BORRAR POR ID
const deleteUnidadById = async (id) => {
  try {
    const connection = await MySQLConnection();
    const [unidades] = await connection.execute('DELETE FROM Unidad WHERE id = ?', [id]);
    if (unidades.affectedRows === 0) {
      throw new Error('No se encontró la unidad con el ID proporcionado');
    }
    console.log('La unidad se eliminó correctamente');
    return unidades;
  } catch (error) {
    console.error('Error al eliminar la unidad:', error);
    throw new Error('Error al eliminar la unidad');
  }
};

//BORRAR TODAS LAS UNIDADES
const deleteAllUnidades = async () => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute('DELETE FROM Unidad');
    console.log('Todas las unidades se eliminaron correctamente');
    return result;
  } catch (error) {
    console.error('Error al eliminar todas las unidades:', error);
    throw new Error('Error al eliminar todas las unidades');
  }
};

//ACTUALIZAR UNIDAD
const updateUnidadById = async (id, unidadData) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute(
      'UPDATE Unidad SET idTipoUnidad = ?, idTipoRecurso = ?, idFrecuenciaCambio = ?, numeroUnidad = ?, choferDesignado = ?, fechaDekra = ?, capacidadTotal = ?, capacidadCamas = ?, capacidadSillas = ?, kilometrajeInicial = ?, kilometrajeActual = ?, adelanto = ?, idEstado = ? WHERE numeroUnidad = ?',
      [
        unidadData.idTipoUnidad,
        unidadData.idTipoRecurso,
        unidadData.idFrecuenciaCambio,
        unidadData.numeroUnidad,
        unidadData.choferDesignado,
        unidadData.fechaDekra,
        unidadData.capacidadTotal,
        unidadData.capacidadCamas,
        unidadData.capacidadSillas,
        unidadData.kilometrajeInicial,
        unidadData.kilometrajeActual,
        unidadData.adelanto,
        unidadData.idEstado,
        id
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error('No se encontró la unidad con el ID proporcionado');
    }
    console.log('La unidad se actualizó correctamente');
    return result;
  } catch (error) {
    console.error('Error al actualizar la unidad:', error);
    throw new Error('Error al actualizar la unidad');
  }
};


module.exports = { createUnidad, getAllUnidades, deleteUnidadById, updateUnidadById, getUnidadesByNumero, deleteAllUnidades };