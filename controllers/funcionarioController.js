// controllers/funcionariosController.js
const funcionariosModel = require('../models/Funcionario'); // Cambiado de acompañante a funcionario

// Obtener todos los funcionarios
const getAllFuncionarios = async (req, res) => {
    try {
        const funcionarios = await funcionariosModel.getAllFuncionarios();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los funcionarios' });
    }
};

// Obtener un funcionario por su ID
const getFuncionarioById = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await funcionariosModel.getFuncionarioById(id);
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener el funcionario con ID ${id}` });
    }
};

// Crear un nuevo funcionario
const createFuncionario = async (req, res) => {
    const newFuncionario = req.body;

    try {
        const createdFuncionario = await funcionariosModel.createFuncionario(newFuncionario);
        res.status(201).json(createdFuncionario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el funcionario' });
    }
};

// Actualizar un funcionario existente por su ID
const updateFuncionario = async (req, res) => {
    const { id } = req.params;
    const updatedFuncionario = req.body;

    try {
        const success = await funcionariosModel.updateFuncionario(id, updatedFuncionario);
        if (success) {
            res.json({ message: 'Funcionario actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Funcionario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar el funcionario con ID ${id}` });
    }
};

// Eliminar un funcionario por su ID
const deleteFuncionario = async (req, res) => {
    const { id } = req.params;

    try {
        const success = await funcionariosModel.deleteFuncionario(id);
        if (success) {
            res.json({ message: 'Funcionario eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Funcionario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar el funcionario con ID ${id}` });
    }
};

module.exports = {
    getAllFuncionarios,
    getFuncionarioById,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario
};
