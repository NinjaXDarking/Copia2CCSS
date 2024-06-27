// controller/RutaController.js

const {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta
} = require('../models/Ruta'); // Asegúrate de que la ruta al modelo sea correcta

// Obtener todas las rutas
const getRutas = async (req, res) => {
  try {
      const rutas = await getAllRutas();
      res.json(rutas);
  } catch (error) {
      console.error('Error al obtener todas las rutas:', error);
      res.status(500).json({ error: 'Error al obtener todas las rutas' });
  }
};

// Obtener una ruta por ID
const getRuta = async (req, res) => {
  const { id } = req.params;
  try {
      const ruta = await getRutaById(id);
      res.json(ruta);
  } catch (error) {
      console.error(`Error al obtener la ruta con ID ${id}:`, error);
      res.status(404).json({ error: 'Ruta no encontrada' });
  }
};

// Crear una nueva ruta
const createNuevaRuta = async (req, res) => {
  const { IdRuta, Descripcion } = req.body;
  try {
      const nuevaRuta = await createRuta(IdRuta, Descripcion);
      res.status(201).json(nuevaRuta);
  } catch (error) {
      console.error('Error al crear la ruta:', error);
      res.status(500).json({ error: 'Error al crear la ruta' });
  }
};

// Actualizar una ruta existente por su ID
const updateRutaExistente = async (req, res) => {
  const { id } = req.params;
  const { Descripcion } = req.body;
  try {
      const actualizacionExitosa = await updateRuta(id, Descripcion);
      if (actualizacionExitosa) {
          res.json({ message: 'Ruta actualizada correctamente' });
      } else {
          res.status(404).json({ error: 'Ruta no encontrada o no actualizada' });
      }
  } catch (error) {
      console.error(`Error al actualizar la ruta con ID ${id}:`, error);
      res.status(500).json({ error: 'Error al actualizar la ruta' });
  }
};

// Eliminar una ruta por su ID
const deleteRutaExistente = async (req, res) => {
  const { id } = req.params;
  try {
      const eliminacionExitosa = await deleteRuta(id);
      if (eliminacionExitosa) {
          res.json({ message: 'Ruta eliminada correctamente' });
      } else {
          res.status(404).json({ error: 'Ruta no encontrada o no eliminada' });
      }
  } catch (error) {
      console.error(`Error al eliminar la ruta con ID ${id}:`, error);
      res.status(500).json({ error: 'Error al eliminar la ruta' });
  }
};

module.exports = {
  getRutas,
  getRuta,
  createNuevaRuta,
  updateRutaExistente,
  deleteRutaExistente
};
