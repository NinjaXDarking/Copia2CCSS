const MySQLConnection = require('../database/mysql');

// CREA CHOFER
const createChofer = async (choferData) => {
  try {
    const connection = await MySQLConnection();
    const [rows] = await connection.execute('INSERT INTO Chofer (cedula, nombre, apellido1, apellido2, contacto, tipoSangre, tipoLicencia, vencimientoLicencia, contactoEmergencia1, nombreCE1, apellido1CE1, apellido2CE1, contactoEmergencia2, nombreCE2, apellido1CE2, apellido2CE2, estadoChofer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      choferData.cedula,
      choferData.nombre,
      choferData.apellido1,
      choferData.apellido2,
      choferData.contacto,
      choferData.tipoSangre,
      choferData.tipoLicencia,
      choferData.vencimientoLicencia,
      choferData.contactoEmergencia1,
      choferData.nombreCE1,
      choferData.apellido1CE1,
      choferData.apellido2CE1,
      choferData.contactoEmergencia2,
      choferData.nombreCE2,
      choferData.apellido1CE2,
      choferData.apellido2CE2,
      choferData.estadoChofer
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

const getChoferesNombreYId = async (id) => {
  try {
    const connection = await MySQLConnection();
    const [choferes] = await connection.execute('SELECT nombre, apellido1, apellido2 FROM Chofer WHERE idChofer = ?', [id]);
    return choferes;
  } catch (error) {
    console.error('Error al obtener el chofer por id:', error);
    throw new Error('Error al obtener el chofer por id');
  }
};

// BORRAR CHOFER POR ID
const deleteChoferByCedula = async (cedula) => {
  if (!cedula) {
    throw new Error("La cédula del chofer es requerida.");
  }

  const connection = await MySQLConnection();

  try {
    // Inicia la transacción
    await connection.beginTransaction();

    // Eliminar referencias en la tabla RevisionVale
    const [deleteReferencesResult] = await connection.execute(
      `DELETE FROM RevisionVale WHERE IdChofer = (SELECT idChofer FROM Chofer WHERE cedula = ?)`,
      [cedula]
    );

    // Eliminar el chofer
    const [result] = await connection.execute(
      'DELETE FROM Chofer WHERE cedula = ?',
      [cedula]
    );

    if (result.affectedRows === 0) {
      throw new Error('No se encontró el chofer con la cédula proporcionada');
    }

    // Hacer commit de la transacción
    await connection.commit();

    return result;
  } catch (error) {
    // Hacer rollback de la transacción en caso de error
    await connection.rollback();
    console.error('Error al eliminar el chofer:', error);
    throw new Error('Error al eliminar el chofer');
  } finally {
    await connection.end();
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
      `UPDATE Chofer SET nombre = ?, apellido1 = ?, apellido2 = ?, contacto = ?, tipoSangre = ?, tipoLicencia = ?, vencimientoLicencia = ?, 
      contactoEmergencia1 = ?, nombreCE1 = ?, apellido1CE1 = ?, apellido2CE1 = ?, 
      contactoEmergencia2 = ?, nombreCE2 = ?, apellido1CE2 = ?, apellido2CE2 = ?, estadoChofer = ? 
      WHERE cedula = ?`,
      [
        choferData.nombre,
        choferData.apellido1,
        choferData.apellido2,
        choferData.contacto,
        choferData.tipoSangre,
        choferData.tipoLicencia,
        choferData.vencimientoLicencia,
        choferData.contactoEmergencia1,
        choferData.nombreCE1,
        choferData.apellido1CE1,
        choferData.apellido2CE1,
        choferData.contactoEmergencia2,
        choferData.nombreCE2,
        choferData.apellido1CE2,
        choferData.apellido2CE2,
        choferData.estadoChofer,
        cedula
      ]
    );
    if (result.affectedRows === 0) {
      throw new Error('No se encontró el chofer con la cédula proporcionada');
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
  getChoferesNombreYId,
  deleteChoferByCedula,
  updateChoferByCedula,
  getChoferesByCedula,
  getChoferesNom,
  deleteAllChoferes
};