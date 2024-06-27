// controllers/motivoValeController.js
const MotivoVale = require('../models/motivoVale');

// Obtener todos los motivos
exports.getAllMotivos = async (req, res) => {
  try {
    const motivos = await MotivoVale.getAllMotivos();
    res.status(200).json(motivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los motivos.' });
  }
};

// Obtener un motivo por ID
exports.getMotivoById = async (req, res) => {
  try {
    const { id } = req.params;
    const motivo = await MotivoVale.getMotivoById(id);
    res.status(200).json(motivo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo motivo
exports.createMotivo = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const newMotivo = await MotivoVale.createMotivo(descripcion);
    res.status(201).json(newMotivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el motivo.' });
  }
};

// Actualizar un motivo existente por su ID
exports.updateMotivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    await MotivoVale.updateMotivo(id, descripcion);
    res.status(200).json({ message: 'Motivo actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un motivo por su ID
exports.deleteMotivo = async (req, res) => {
  try {
    const { id } = req.params;
    await MotivoVale.deleteMotivo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
