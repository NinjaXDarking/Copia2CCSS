// controllers/servicioController.js
const Servicio = require('../models/Servicio');

// Obtener todos los servicios
exports.getAllServicios = async (req, res) => {
  try {
    const servicios = await Servicio.getAllServicios();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los servicios.' });
  }
};

// Obtener un servicio por ID
exports.getServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await Servicio.getServicioById(id);
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo servicio
exports.createServicio = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const newServicio = await Servicio.createServicio(descripcion);
    res.status(201).json(newServicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio.' });
  }
};

// Actualizar un servicio existente por su ID
exports.updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    await Servicio.updateServicio(id, descripcion);
    res.status(200).json({ message: 'Servicio actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un servicio por su ID
exports.deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;
    await Servicio.deleteServicio(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
