const MySQLConnection = require('../database/mysql');

// CREA CHOFER
const createChofer = async (choferData) => {
  try {
    const connection = await MySQLConnection();
    const [rows] = await connection.execute('INSERT INTO Chofer (cedula, nombre, apellido1, apellido2, contacto, tipoSangre, vencimientoLicencia) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      choferData.cedula,
      choferData.nombre,
      choferData.apellido1,
      choferData.apellido2,
      choferData.contacto,
      choferData.tipoSangre,
      choferData.vencimientoLicencia
    ]);
    return rows;
  } catch (error) {
    console.error('Error al crear el chofer:', error);
    throw new Error('Error al crear el chofer');
  }
};

// OBTENER TODOS LOS CHOFERES
const getAllChoferes = async () => {
  try {
    const connection = await MySQLConnection();
    const [choferes] = await connection.execute('SELECT * FROM Chofer');
    return choferes;
  } catch (error) {
    console.error('Error al obtener todos los choferes:', error);
    throw new Error('Error al obtener todos los choferes');
  }
};

// OBTENER CHOFER POR CEDULA
const getChoferesByCedula = async (cedula) => {
  try {
    const connection = await MySQLConnection();
    const [choferes] = await connection.execute('SELECT * FROM Chofer WHERE cedula = ?', [cedula]);
    return choferes;
  } catch (error) {
    console.error('Error al obtener el chofer por cedula:', error);
    throw new Error('Error al obtener el chofer por cedula');
  }
};

// OBTENER NOMBRE DE CHOFERES
const getChoferesNom = async () => {
  try {
    const connection = await MySQLConnection();
    const [choferes] = await connection.execute('SELECT nombre, apellido1, apellido2 FROM Chofer');
    return choferes;
  } catch (error) {
    console.error('Error al obtener el chofer:', error);
    throw new Error('Error al obtener el chofer');
  }
};

// BORRAR CHOFER POR ID
const deleteChoferByCedula = async (cedula) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute('DELETE FROM Chofer WHERE cedula = ?', [cedula]);
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el chofer con la cedula proporcionada');
    }
    return result;
  } catch (error) {
    console.error('Error al eliminar el chofer:', error);
    throw new Error('Error al eliminar el chofer');
  }
};

// BORRAR TODOS LOS CHOFERES
const deleteAllChoferes = async () => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute('DELETE FROM Chofer');
    return result;
  } catch (error) {
    console.error('Error al eliminar todos los choferes:', error);
    throw new Error('Error al eliminar todos los choferes');
  }
};

// ACTUALIZAR CHOFER
const updateChoferByCedula = async (cedula, choferData) => {
  try {
    const connection = await MySQLConnection();
    const [result] = await connection.execute(
      'UPDATE Chofer SET nombre = ?, contacto = ?, tipoSangre = ?, vencimientoLicencia = ? WHERE cedula = ?',
      [
        choferData.nombre,
        choferData.contacto,
        choferData.tipoSangre,
        choferData.vencimientoLicencia,
        cedula
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el chofer con la cedula proporcionada');
    }
    return result;
  } catch (error) {
    console.error('Error al actualizar el chofer:', error);
    throw new Error('Error al actualizar el chofer');
  }
};

module.exports = { 
  createChofer, 
  getAllChoferes, 
  deleteChoferByCedula, 
  updateChoferByCedula, 
  getChoferesByCedula, 
  getChoferesNom,
  deleteAllChoferes 
};
