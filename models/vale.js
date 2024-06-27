const MySQLConnection = require("../database/mysql");

// Obtener todas las solicitudes de vales
const getAllVales = async () => {
  let connection;
  try {
    // Abrir conexión
    connection = await MySQLConnection();

    const sql = `
      SELECT
        sv.IdVale,
        sv.NombreSolicitante,
        sv.SalidaId,
        r_salida.Descripcion AS NombreSalida,
        sv.DestinoId,
        r_destino.Descripcion AS NombreDestino,
        sv.MotivoId,
        mv.Descripcion AS NombreMotivo,
        sv.ServicioId,
        s.Descripcion AS NombreServicio,
        sv.Fecha_Solicitud,
        sv.Hora_Salida,
        sv.Detalle,
        sv.EstadoId,
        ev.NombreEstado AS NombreEstado,
        sv.IdUnidadProgramatica,
        up.NombreUnidad AS NombreUnidadProgramatica,
        sv.Acompanante1,
        sv.Acompanante2,
        sv.Acompanante3,
        sv.Acompanante4,
        sv.Acompanante5
      FROM
        SolicitudVale sv
        LEFT JOIN Ruta r_destino ON sv.DestinoId = r_destino.IdRuta
        LEFT JOIN Ruta r_salida ON sv.SalidaId = r_salida.IdRuta
        LEFT JOIN MotivoVale mv ON sv.MotivoId = mv.Id
        LEFT JOIN servicio s ON sv.ServicioId = s.ServicioID
        LEFT JOIN EstadoVale ev ON sv.EstadoId = ev.IdEstado
        LEFT JOIN UnidadProgramatica up ON sv.IdUnidadProgramatica = up.IdUnidadProgramatica
    `;
    
    // Ejecutar consulta
    const [rows] = await connection.query(sql);

    // Retornar resultados
    return rows;
  } catch (error) {
    console.error("Error al obtener todas las solicitudes de vales:", error);
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

// Obtener una solicitud de vale por su ID
const getValeById = async (id) => {
  let connection;
  try {
    // Abrir conexión
    connection = await MySQLConnection();

    // Consulta SQL para obtener el vale por ID
    const sql = `
     SELECT
        sv.IdVale,
        sv.NombreSolicitante,
        sv.SalidaId,
        r_salida.Descripcion AS NombreSalida,
        sv.DestinoId,
        r_destino.Descripcion AS NombreDestino,
        sv.MotivoId,
        mv.Descripcion AS NombreMotivo,
        sv.ServicioId,
        s.Descripcion AS NombreServicio,
        sv.Fecha_Solicitud,
        sv.Hora_Salida,
        sv.Detalle,
        sv.EstadoId,
        ev.NombreEstado AS NombreEstado,
        sv.IdUnidadProgramatica,
        up.NombreUnidad AS NombreUnidadProgramatica,
        sv.Acompanante1,
        sv.Acompanante2,
        sv.Acompanante3,
        sv.Acompanante4,
        sv.Acompanante5
      FROM
        SolicitudVale sv
        LEFT JOIN Ruta r_destino ON sv.DestinoId = r_destino.IdRuta
        LEFT JOIN Ruta r_salida ON sv.SalidaId = r_salida.IdRuta
        LEFT JOIN MotivoVale mv ON sv.MotivoId = mv.Id
        LEFT JOIN servicio s ON sv.ServicioId = s.ServicioID
        LEFT JOIN EstadoVale ev ON sv.EstadoId = ev.IdEstado
        LEFT JOIN UnidadProgramatica up ON sv.IdUnidadProgramatica = up.IdUnidadProgramatica
      WHERE
        sv.IdVale = ?
    `;
    
    // Ejecutar consulta
    const [rows] = await connection.query(sql, [id]);

    // Verificar si se encontró el vale
    if (rows.length === 0) {
      throw new Error(`Solicitud de vale con ID ${id} no encontrada`);
    }

    // Retornar resultado
    return rows[0];
  } catch (error) {
    console.error(`Error al obtener la solicitud de vale con ID ${id}:`, error);
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

// Crear una nueva solicitud de vale
const createVale = async (vale) => {
  const {
    NombreSolicitante,
    DestinoId,
    SalidaId,
    MotivoId,
    ServicioId,
    Fecha_Solicitud,
    Hora_Salida,
    Detalle,
    IdUnidadProgramatica,
    Acompanante1,
    Acompanante2,
    Acompanante3,
    Acompanante4,
    Acompanante5,
    EstadoId,
  } = vale;

  let connection;
  try {
    // Abrir conexión
    connection = await MySQLConnection();

    // Obtener el año actual
    const year = new Date().getFullYear();

    // Obtener el último ID de vale insertado para el año actual
    const [lastVale] = await connection.query(
      `SELECT IdVale 
       FROM SolicitudVale 
       WHERE IdVale LIKE ? 
       ORDER BY IdVale DESC 
       LIMIT 1`,
      [`${year}-%`]
    );

    // Determinar el próximo número de secuencia
    let nextSequence = 1;
    if (lastVale.length > 0) {
      const lastSequence = parseInt(lastVale[0].IdVale.split("-")[1]);
      nextSequence = lastSequence + 1;
    }

    // Formatear el nuevo IdVale
    const newIdVale = `${year}-${String(nextSequence).padStart(3, "0")}`;

    // Ejecutar consulta para insertar el nuevo vale
    const [result] = await connection.query(
      `INSERT INTO SolicitudVale 
       (IdVale, NombreSolicitante, DestinoId, SalidaId, MotivoId, ServicioId, Fecha_Solicitud, Hora_Salida, Detalle, IdUnidadProgramatica, Acompanante1, Acompanante2, Acompanante3, Acompanante4, Acompanante5, EstadoId) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newIdVale,
        NombreSolicitante,
        DestinoId,
        SalidaId,
        MotivoId,
        ServicioId,
        Fecha_Solicitud,
        Hora_Salida,
        Detalle,
        IdUnidadProgramatica,
        Acompanante1,
        Acompanante2,
        Acompanante3,
        Acompanante4,
        Acompanante5,
        EstadoId,
      ]
    );

    // Retornar el vale creado con un mensaje de éxito
    return {
      IdVale: newIdVale,
      ...vale,
    };
  } catch (error) {
    console.error("Error al crear la solicitud de vale:", error);
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

// Actualizar una solicitud de vale
const updateVale = async (id, vale) => {
  const {
    NombreSolicitante,
    DestinoId,
    SalidaId,
    MotivoId,
    ServicioId,
    Fecha_Solicitud,
    Hora_Salida,
    Detalle,
    EstadoId,
    IdUnidadProgramatica,
    Acompanante1,
    Acompanante2,
    Acompanante3,
    Acompanante4,
    Acompanante5,
  } = vale;

  let connection;
  try {
    // Abrir conexión
    connection = await MySQLConnection();

    // Ejecutar consulta para actualizar el vale
    const [result] = await connection.query(
      `UPDATE SolicitudVale
       SET
          NombreSolicitante = ?,
          DestinoId = ?,
          SalidaId = ?,
          MotivoId = ?,
          ServicioId = ?,
          Fecha_Solicitud = ?,
          Hora_Salida = ?,
          Detalle = ?,
          EstadoId = ?,
          IdUnidadProgramatica = ?,
          Acompanante1 = ?,
          Acompanante2 = ?,
          Acompanante3 = ?,
          Acompanante4 = ?,
          Acompanante5 = ?
       WHERE IdVale = ?`,
      [
        NombreSolicitante,
        DestinoId,
        SalidaId,
        MotivoId,
        ServicioId,
        Fecha_Solicitud,
        Hora_Salida,
        Detalle,
        EstadoId,
        IdUnidadProgramatica,
        Acompanante1,
        Acompanante2,
        Acompanante3,
        Acompanante4,
        Acompanante5,
        id,
      ]
    );

    // Verificar si se actualizó el vale
    if (result.affectedRows === 0)
      throw new Error(`Solicitud de vale con ID ${id} no encontrada`);

    // Retornar mensaje de éxito
    return {
      message: `Solicitud de vale con ID ${id} actualizada exitosamente`,
      vale: {
        IdVale: id,
        ...vale,
      },
    };
  } catch (error) {
    console.error(`Error al actualizar la solicitud de vale con ID ${id}:`, error);
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

// Función para obtener el último registro
const getLastSolicitudVale = async () => {
  let connection;
  try {
    connection = await MySQLConnection();

    const [result] = await connection.query(
      `SELECT * 
       FROM SolicitudVale 
       ORDER BY IdVale DESC 
       LIMIT 1`
    );

    return result[0] || null; // Devolver el primer resultado o null si no hay registros
  } catch (error) {
    console.error('Error fetching last SolicitudVale:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

// Actualizar estado de una solicitud de vale por su ID
const updateEstadoVale = async (idVale, idEstado) => {
  let connection;
  try {
    // Abrir conexión
    connection = await MySQLConnection();

    // Ejecutar consulta para actualizar el estado del vale
    const [result] = await connection.query(
      `UPDATE SolicitudVale
       SET EstadoId = ?
       WHERE IdVale = ?`,
      [idEstado, idVale]
    );

    // Verificar si se actualizó el vale
    if (result.affectedRows === 0) {
      throw new Error(`Solicitud de vale con ID ${idVale} no encontrada`);
    }

    // Retornar mensaje de éxito
    return {
      message: `Estado del vale con ID ${idVale} actualizado exitosamente`,
      idVale: idVale,
      idEstado: idEstado,
    };
  } catch (error) {
    console.error(`Error al actualizar el estado del vale con ID ${idVale}:`, error);
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

module.exports = {
  getAllVales,
  getValeById,
  createVale,
  updateVale,
  getLastSolicitudVale,
  updateEstadoVale, 
};