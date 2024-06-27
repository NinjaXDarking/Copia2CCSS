const MySQLConnection = require('../database/mysql');

// Obtener todos los funcionarios
const getAllFuncionarios = async () => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM Funcionario');
        return rows;
    } catch (error) {
        console.error('Error al obtener todos los funcionarios:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

// Obtener un funcionario por su ID
const getFuncionarioById = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [rows] = await connection.query('SELECT * FROM Funcionario WHERE IdFuncionario = ?', [id]);
        if (rows.length === 0) throw new Error('Funcionario no encontrado');
        return rows[0];
    } catch (error) {
        console.error(`Error al obtener el funcionario con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

// Crear un nuevo funcionario
const createFuncionario = async (funcionario) => {
    const { Nombre, Cargo, Contacto } = funcionario;
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'INSERT INTO Funcionario (Nombre, Cargo, Contacto) VALUES (?, ?, ?)',
            [Nombre, Cargo, Contacto]
        );
        return { IdFuncionario: result.insertId, ...funcionario };
    } catch (error) {
        console.error('Error al crear el funcionario:', error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

// Actualizar un funcionario existente por su ID
const updateFuncionario = async (id, funcionario) => {
    const { Nombre, Cargo, Contacto } = funcionario;
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query(
            'UPDATE Funcionario SET Nombre = ?, Cargo = ?, Contacto = ? WHERE IdFuncionario = ?',
            [Nombre, Cargo, Contacto, id]
        );
        if (result.affectedRows === 0) throw new Error('Funcionario no encontrado o no actualizado');
        return true;
    } catch (error) {
        console.error(`Error al actualizar el funcionario con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

// Eliminar un funcionario por su ID
const deleteFuncionario = async (id) => {
    let connection;
    try {
        connection = await MySQLConnection();
        const [result] = await connection.query('DELETE FROM Funcionario WHERE IdFuncionario = ?', [id]);
        if (result.affectedRows === 0) throw new Error('Funcionario no encontrado o no eliminado');
        return true;
    } catch (error) {
        console.error(`Error al eliminar el funcionario con ID ${id}:`, error);
        throw error;
    } finally {
        if (connection) await connection.end();
    }
};

module.exports = {
    getAllFuncionarios,
    getFuncionarioById,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario
};
