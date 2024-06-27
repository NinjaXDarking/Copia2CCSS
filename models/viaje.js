const MySQLConnection = require('../database/mysql');

const createViaje = async (viajeData) => {
    let connection
  try {
      connection = await MySQLConnection();
    //   console.log(viajeData);
    //   console.log("viajeData");
    //   console.log("viajeData");
      const [rows] = await connection.execute('CALL SP_InsertViaje(?,?,?,?,?)', [
        viajeData.idUnidad,
        viajeData.IdChofer,
        viajeData.EstadoViaje,
        viajeData.fechaInicioViaje,
        viajeData.idUsuario
      ]);

      if (rows.affectedRows === 0) {
        console.log('No se enconto ningun viaje');
        return { success: false, message: 'No se puedo registrar el viaje' };
    } else {
        console.log('El viaje se registro exitosamente');
        return { success: true, message: 'El viaje se registro exitosamente' };
    } 
    
  } catch (error) {
      console.error('Error al registrar el viaje:', error);
      throw new Error('Error al registrar el viaje');
  } finally {
     connection.close()
  }
};

const putViajeCitas = async (idUnidad,idUsuario,idCita) => {
    let connection
  try {
      connection = await MySQLConnection();
      const [viaje] = await connection.execute(`CALL SP_InsertarViajeCita(?,?,?);`,
        [idUnidad,idUsuario,idCita]);

    if (viaje.length === 0) {
        console.log('No se enconto ningun viaje');
        return { success: false, message: 'No se enconto ningun viaje' };
    } else {
        console.log('El viaje se encontro exitosamente');
        return { success: true, viaje: viaje };
    }  

    } catch (error) {
      console.error('Error al obtener los datos de la tabla:', error);
      throw new Error('Error al obtener los datos de la tabla');
    } finally {
        connection.close()
    }
};



const getAllRelacionViajesCitasM = async () => {
    let connection
  try {
      connection = await MySQLConnection();
      const [ViajesCitas] = await connection.execute('SELECT * FROM ViajeCita');

    if (ViajesCitas.length === 0) {
        console.log('No se enconto ningun ViajesCitas');
        return { success: false, message: 'No se enconto ningun ViajesCitas' };
    } else {
        console.log('El ViajesCitas se encontro exitosamente');
        return { success: true, ViajesCitas: ViajesCitas };
    }  

    } catch (error) {
      console.error('Error al obtener los datos de la tabla:', error);
      throw new Error('Error al obtener los datos de la tabla');
    } finally {
        connection.close()
    }
};

const getAllviajes = async () => {
    let connection
  try {
      connection = await MySQLConnection();
      const [viaje] = await connection.execute('SELECT * FROM Viaje');

    if (viaje.length === 0) {
        console.log('No se enconto ningun viaje');
        return { success: false, message: 'No se enconto ningun viaje' };
    } else {
        console.log('El viaje se encontro exitosamente');
        return { success: true, viaje: viaje };
    }  

    } catch (error) {
      console.error('Error al obtener los datos de la tabla:', error);
      throw new Error('Error al obtener los datos de la tabla');
    } finally {
        connection.close()
    }
};

const getAllviajesById = async (idViaje) => {
    let connection

    try {
        connection = await MySQLConnection();
        console.log(`id models get: ${idViaje}`);
        const [viaje] = await connection.execute('SELECT * FROM Viaje WHERE idViaje = ?', [idViaje]);

        if (viaje.length === 0) {
            console.log('No se enconto ningun viaje');
            return { success: false, message: 'No se enconto ningun viaje' };
        } else {
            console.log('El viaje se encontro exitosamente');
            return { success: true, viaje: viaje};
        }

    } catch (error) {
        console.error('Error al obtener el viaje:', error);
        throw new Error('Error al obtener el viaje');
    } finally {
        connection.close()
    }
}

const eliminateViaje = async (idViaje) => {
    let connection

    try {
        connection = await MySQLConnection();
        console.log(`id models delete: ${idViaje}`);
        const [rows, fields] = await connection.execute('CALL SP_DeleteViajeCita(?);', [idViaje]);

        if (rows.affectedRows === 0) {
            console.log('No se enconto ningun viaje');
            return { success: false, message: 'No se enconto ningun viaje' };
        } else {
            console.log('El viaje se elimino exitosamente');
            return { success: true, message: 'El viaje se elimino exitosamente' };
        }
        
    } catch (error) {
        console.error('Error al eliminar el viaje:', error);
        throw new Error('Error al eliminar el viaje');
    } finally {
        connection.close()
    }
}

const updatingViaje = async (idViaje, viajeData) => {
    let connection;
    try {
        connection = await MySQLConnection();
        console.log(`id models update: ${idViaje}`);
        console.log(`nuevos datos models:`, viajeData);

        // Definir los campos válidos que existen en la tabla
        const validFields = [
            'idUnidad', 
            'idChofer', 
            'FechaInicio', 
            'LugarSalida', 
            'idUbicacionDestino', 
            'EstadoViaje', 
            'Condicion', 
            'EstadoCita', 
            'FechaCita', 
            'HoraCita', 
            'Traslado',
            'Camilla',
            'horaInicioViaje', 
            'fechaInicioViaje',
            'horaFinViaje', 
            'kilometrajeFinal', 
            'horasExtras', 
            'viaticos'
        ];

        let updateFields = '';
        const updateValues = [];

        for (const key in viajeData) {
            if (viajeData.hasOwnProperty(key) && validFields.includes(key)) {
                updateFields += `${key} = ?, `;
                updateValues.push(viajeData[key]);
            }
        }

        if (updateFields === '') {
            throw new Error('Los campos no son validos');
        }

        updateFields = updateFields.slice(0, -2);

        updateValues.push(idViaje);

        const query = `UPDATE Viaje SET ${updateFields} WHERE idViaje = ?`;

        const [rows, fields] = await connection.execute(query, updateValues);

        if (rows.affectedRows === 0) {
            console.log('No se encontró ningún viaje');
            return { success: false, message: 'No se encontró ningún viaje' };
        } else {
            console.log('El viaje se actualizó correctamente');
            return { success: true, message: 'El viaje se actualizó correctamente' };
        }
    } catch (error) {
        console.error('Error al actualizar el viaje:', error);
        throw new Error('Error al actualizar el viaje');
    } finally {
        if (connection) await connection.end();
    }
};

const UpdateViajeCitaM = async (idViaje, idCita) => {
    let connection;
    try {
        // Definir los campos válidos que existen en la tabla
        connection = await MySQLConnection();
        const [ViajeCita] = await connection.execute(`CALL SP_UpdateViajeCita(?,?);`,
          [idViaje,idCita]);
  
      if (ViajeCita.length === 0) {
          console.log('No se enconto ningun ViajeCita');
          return { success: false, message: 'No se enconto ningun ViajeCita' };
      } else {
          console.log('El ViajeCita se encontro exitosamente');
          return { success: true, ViajeCita: ViajeCita };
      } 
    } catch (error) {
        console.error('Error al actualizar el ViajeCita:', error);
        throw new Error('Error al actualizar el ViajeCita');
    } finally {
        connection.close()
    }
};

module.exports = { UpdateViajeCitaM, createViaje, getAllviajes, eliminateViaje, updatingViaje, getAllviajesById, putViajeCitas, getAllRelacionViajesCitasM};