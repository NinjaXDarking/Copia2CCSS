// controllers/destinoController.js
const Destino = require('../models/Destino');

// Obtener todos los destinos
exports.getAllDestinos = async (req, res) => {
  try {
    const destinos = await Destino.getAllDestinos();
    res.status(200).json(destinos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los destinos.' });
  }
};

// Obtener un destino por ID
exports.getDestinoById = async (req, res) => {
  try {
    const { id } = req.params;
    const destino = await Destino.getDestinoById(id);
    res.status(200).json(destino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo destino
exports.createDestino = async (req, res) => {
  try {
    const { IdDestino, Descripcion } = req.body;
    const newDestino = await Destino.createDestino(IdDestino, Descripcion);
    res.status(201).json(newDestino);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el destino.' });
  }
};

// Actualizar un destino existente por su ID
exports.updateDestino = async (req, res) => {
  try {
    const { id } = req.params;
    const { Descripcion } = req.body;
    await Destino.updateDestino(id, Descripcion);
    res.status(200).json({ message: 'Destino actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un destino por su ID
exports.deleteDestino = async (req, res) => {
  try {
    const { id } = req.params;
    await Destino.deleteDestino(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
