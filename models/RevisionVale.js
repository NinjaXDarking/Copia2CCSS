const MySQLConnection = require('../database/mysql');



const getRevicionVales = async () => {
    let connection;
    try {
        connection = await MySQLConnection();

        // Consultar todas las revisiones de vales
        const [rows] = await connection.query(
            `SELECT IdRevicion, IdVale, IdUnidad, IdChofer, IdFuncionario, FechaRevision, Observaciones
             FROM RevicionVale`
        );

        // Retornar el resultado de las revisiones de vales
        return rows;
    } catch (error) {
        console.error('Error fetching RevicionVales:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};







const createRevicionVale = async (revicionVale) => {
    const {
        IdUnidad,
        IdChofer,
        IdFuncionario,
        Observaciones
    } = revicionVale;

    let connection;
    try {
        connection = await MySQLConnection();

        // Obtener el año actual
        const year = new Date().getFullYear();

        // Obtener el último ID de revisión insertado para el año actual
        const [lastRevicion] = await connection.query(
            `SELECT IdRevicion 
             FROM RevicionVale 
             WHERE IdRevicion LIKE ? 
             ORDER BY IdRevicion DESC 
             LIMIT 1`,
            [`${year}-%`]
        );

        // Determinar el próximo número de secuencia
        let nextSequence = 1;
        if (lastRevicion.length > 0) {
            const lastSequence = parseInt(lastRevicion[0].IdRevicion.split("-")[1]);
            nextSequence = lastSequence + 1;
        }

        // Formatear el nuevo IdRevicion
        const newIdRevicion = `${year}-${String(nextSequence).padStart(3, "0")}`;

        // Ejecutar consulta para insertar la nueva revisión de vale
        const [result] = await connection.query(
            `INSERT INTO RevicionVale 
             (IdRevicion, IdUnidad, IdChofer, IdFuncionario, FechaRevision, Observaciones) 
             VALUES (?, ?, ?, ?, NOW(), ?)`,
            [
                newIdRevicion,
                IdUnidad,
                IdChofer,
                IdFuncionario,
                Observaciones
            ]
        );

        // Retornar el objeto de la revisión creada con el ID generado y la fecha actual
        return {
            IdRevicion: newIdRevicion,
            FechaRevision: new Date().toISOString(), // Opcional: si quieres retornar la fecha actual
            ...revicionVale
        };
    } catch (error) {
        console.error('Error creating RevicionVale:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

module.exports = {
    createRevicionVale,
    getRevicionVales
};