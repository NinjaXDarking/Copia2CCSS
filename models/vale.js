// models/SolicitudVale.js
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
      sv.Unidad,
      sv.DestinoId,
      d.Descripcion AS Destino,
      sv.MotivoID,
      mv.descripcion AS Motivo,
      sv.ServicioID,
      s.Descripcion AS Servicio,
      sv.Fecha_Solicitud,
      sv.Hora_Salida,
      sv.Detalle,
      sv.EstadoValeID,
      ev.NombreEstado AS EstadoVale,
      sv.IdUnidadProgramatica,
      up.NombreUnidad AS UnidadProgramatica,
      sv.Acompanante1,
      f1.Nombre AS NombreAcompanante1,
      sv.Acompanante2,
      f2.Nombre AS NombreAcompanante2,
      sv.Acompanante3,
      f3.Nombre AS NombreAcompanante3,
      sv.Acompanante4,
      f4.Nombre AS NombreAcompanante4,
      sv.Acompanante5,
      f5.Nombre AS NombreAcompanante5
  FROM
      SolicitudVale sv
      INNER JOIN EstadoVale ev ON sv.EstadoValeID = ev.IdEstado
      INNER JOIN MotivoVale mv ON sv.MotivoID = mv.id
      INNER JOIN servicio s ON sv.ServicioID = s.ServicioID
      INNER JOIN destino d ON d.IdDestino = sv.DestinoId
      INNER JOIN UnidadProgramatica up ON sv.IdUnidadProgramatica = up.IdUnidadProgramatica
      LEFT JOIN Funcionario f1 ON sv.Acompanante1 = f1.IdFuncionario
      LEFT JOIN Funcionario f2 ON sv.Acompanante2 = f2.IdFuncionario
      LEFT JOIN Funcionario f3 ON sv.Acompanante3 = f3.IdFuncionario
      LEFT JOIN Funcionario f4 ON sv.Acompanante4 = f4.IdFuncionario
      LEFT JOIN Funcionario f5 ON sv.Acompanante5 = f5.IdFuncionario;
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

    // Ejecutar consulta
    const [rows] = await connection.query(
      `
            SELECT
                sv.IdVale,
                sv.NombreSolicitante,
                sv.Unidad,
                sv.DestinoId,
                d.Descripcion AS Destino,
                sv.MotivoID,
                mv.descripcion AS Motivo,
                sv.ServicioID,
                s.Descripcion AS Servicio,
                sv.Fecha_Solicitud,
                sv.Hora_Salida,
                sv.Detalle,
                sv.EstadoValeID,
                ev.NombreEstado AS EstadoVale,
                sv.IdUnidadProgramatica,
                up.NombreUnidad AS UnidadProgramatica,
                sv.Acompanante1,
                f1.Nombre AS NombreAcompanante1,
                sv.Acompanante2,
                f2.Nombre AS NombreAcompanante2,
                sv.Acompanante3,
                f3.Nombre AS NombreAcompanante3,
                sv.Acompanante4,
                f4.Nombre AS NombreAcompanante4,
                sv.Acompanante5,
                f5.Nombre AS NombreAcompanante5
            FROM
                SolicitudVale sv
                INNER JOIN EstadoVale ev ON sv.EstadoValeID = ev.IdEstado
                INNER JOIN MotivoVale mv ON sv.MotivoID = mv.id
                INNER JOIN servicio s ON sv.ServicioID = s.ServicioID
                INNER JOIN destino d ON d.IdDestino = sv.DestinoId
                INNER JOIN UnidadProgramatica up ON sv.IdUnidadProgramatica = up.IdUnidadProgramatica
                LEFT JOIN Funcionario f1 ON sv.Acompanante1 = f1.IdFuncionario
                LEFT JOIN Funcionario f2 ON sv.Acompanante2 = f2.IdFuncionario
                LEFT JOIN Funcionario f3 ON sv.Acompanante3 = f3.IdFuncionario
                LEFT JOIN Funcionario f4 ON sv.Acompanante4 = f4.IdFuncionario
                LEFT JOIN Funcionario f5 ON sv.Acompanante5 = f5.IdFuncionario
            WHERE
                sv.IdVale = ?
        `,
      [id]
    );

    // Verificar si se encontró el vale
    if (rows.length === 0) throw new Error("Solicitud de vale no encontrada");

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
    Unidad,
    DestinoId,
    MotivoID,
    ServicioID,
    Fecha_Solicitud,
    Hora_Salida,
    Detalle,
    IdUnidadProgramatica,
    Acompanante1,
    Acompanante2,
    Acompanante3,
    Acompanante4,
    Acompanante5,
    EstadoValeID,
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
             (IdVale, NombreSolicitante, Unidad, DestinoId, MotivoID, ServicioID, Fecha_Solicitud, Hora_Salida, Detalle, IdUnidadProgramatica, Acompanante1, Acompanante2, Acompanante3, Acompanante4, Acompanante5, EstadoValeID) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newIdVale,
        NombreSolicitante,
        Unidad,
        DestinoId,
        MotivoID,
        ServicioID,
        Fecha_Solicitud,
        Hora_Salida,
        Detalle,
        IdUnidadProgramatica,
        Acompanante1,
        Acompanante2,
        Acompanante3,
        Acompanante4,
        Acompanante5,
        EstadoValeID,
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

const updateVale = async (id, vale) => {
  const {
    NombreSolicitante,
    Unidad,
    DestinoId,
    MotivoID,
    ServicioID,
    Fecha_Solicitud,
    Hora_Salida,
    Detalle,
    EstadoValeID, // Cambio de Estado a EstadoValeID
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

    // Ejecutar consulta
    const [result] = await connection.query(
      `UPDATE SolicitudVale 
             SET NombreSolicitante = ?, Unidad = ?, DestinoId = ?, MotivoID = ?, ServicioID = ?, Fecha_Solicitud = ?, Hora_Salida = ?, Detalle = ?, EstadoValeID = ?, IdUnidadProgramatica = ?, Acompanante1 = ?, Acompanante2 = ?, Acompanante3 = ?, Acompanante4 = ?, Acompanante5 = ? 
             WHERE IdVale = ?`,
      [
        NombreSolicitante,
        Unidad,
        DestinoId,
        MotivoID,
        ServicioID,
        Fecha_Solicitud,
        Hora_Salida,
        Detalle,
        EstadoValeID,
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
    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Solicitud de vale no encontrada o no actualizada",
      };
    }

    // Retornar mensaje de éxito si la actualización fue exitosa
    return {
      success: true,
      message: `Solicitud de vale con ID ${id} actualizada exitosamente`,
    };
  } catch (error) {
    console.error(
      `Error al actualizar la solicitud de vale con ID ${id}:`,
      error
    );
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

// Eliminar una solicitud de vale por su ID
const deleteVale = async (id) => {
  let connection;
  try {
    // Abrir conexión
    connection = await MySQLConnection();

    // Ejecutar consulta
    const [result] = await connection.query(
      "DELETE FROM SolicitudVale WHERE IdVale = ?",
      [id]
    );

    // Verificar si se eliminó el vale
    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Solicitud de vale no encontrada o no eliminada",
      };
    }

    // Retornar mensaje de éxito si la eliminación fue exitosa
    return {
      success: true,
      message: `Solicitud de vale con ID ${id} eliminada exitosamente`,
    };
  } catch (error) {
    console.error(
      `Error al eliminar la solicitud de vale con ID ${id}:`,
      error
    );
    throw error;
  } finally {
    if (connection) await connection.end(); // Cerrar conexión
  }
};

module.exports = {
  deleteVale,
};

module.exports = {
  getAllVales,
  getValeById,
  createVale,
  updateVale,
  deleteVale,
};
