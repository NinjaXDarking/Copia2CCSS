const MySQLConnection = require('../database/mysql');

const getRevicionVales = async () => {
    let connection;
    try {
        connection = await MySQLConnection();

        // Consultar todas las revisiones de vales
        const [rows] = await connection.query(
            `SELECT IdRevision, IdVale, IdUnidad, IdChofer, Encargado, FechaRevision, HoraRevision, Observaciones
             FROM RevisionVale`
        );

        // Retornar el resultado de las revisiones de vales
        return rows;
    } catch (error) {
        console.error('Error fetching RevisionVales:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};
const createRevicionVale = async (revisionVale) => {
    const {
        IdVale,
        IdUnidad,
        IdChofer,
        Encargado,
        FechaRevision, 
        HoraRevision,
        Observaciones
    } = revisionVale;

    let connection;
    try {
        connection = await MySQLConnection();
        const year = new Date().getFullYear();

        // Obtener la fecha y hora actual en Costa Rica
        
        // Obtener el último número de registro insertado para el año actual
        const [lastRevision] = await connection.query(
            `SELECT IdRevision 
             FROM RevisionVale 
             WHERE IdRevision LIKE ? 
             ORDER BY IdRevision DESC 
             LIMIT 1`,
            [`${year}-%`]
        );

        // Determinar el próximo número de secuencia
        let nextSequence = 1;
        if (lastRevision.length > 0) {
            const lastSequence = parseInt(lastRevision[0].IdRevision.split("-")[1]);
            nextSequence = lastSequence + 1;
        }

        // Formatear el nuevo IdRevision
        const newIdRevision = `${year}-${String(nextSequence).padStart(3, "0")}`;

        // Ejecutar consulta para insertar la nueva revisión de vale
        const [result] = await connection.query(
            `INSERT INTO RevisionVale 
             (IdRevision, IdVale, IdUnidad, IdChofer, Encargado, FechaRevision, HoraRevision, Observaciones) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newIdRevision,
                IdVale,
                IdUnidad,
                IdChofer,
                Encargado,
                FechaRevision, // Fecha en formato yyyy-MM-dd
                HoraRevision, // Hora en formato HH:mm:ss
                Observaciones
            ]
        );

        // Retornar el objeto de la revisión creada con el ID generado y la fecha actual
        return {
            IdRevision: newIdRevision, // Retornar la fecha y hora de Costa Rica
            ...revisionVale
        };
    } catch (error) {
        console.error('Error creating RevisionVale:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};


module.exports = {
    createRevicionVale,
    getRevicionVales
};
