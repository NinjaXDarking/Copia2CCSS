const { createFrecuenciaCambio, getAllFrecuenciaCambios, getFrecuenciaCambioByID, deleteFrecuenciaCambioById, updateFrecuenciaCambioById} = require('../models/frecuenciacambio');

const postFrecuenciaCambio = async (req, res) => {
    try {
      const frecuenciaCambioData = req.body;
      const result = await createFrecuenciaCambio(frecuenciaCambioData);
      res.status(201).json({ message: 'Frecuencia de cambio creada', data: result });
    } catch (error) {
      if (error.message === 'El idFrecuenciaCambio ya existe') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al crear la frecuencia de cambio', error: error.message });
      }
    }
  };

  const getAllFrecuenciaCambiosCont = async (req, res) => {
    try {
      const frecuenciacambios = await getAllFrecuenciaCambios();
      res.json({ message: 'Frecuencias de cambio obtenidas exitosamente', frecuenciacambios });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error al obtener todas las frecuencias de cambio' });
    }
  };

  const getFrecuenciaCambioByIDCont = async (req, res) => {
    const { idFrecuenciaCambio } = req.params;
    try {
      const frecuenciacambio = await getFrecuenciaCambioByID(idFrecuenciaCambio);
      if (frecuenciacambio) {
        res.json({ message: 'Frecuencia de cambio obtenida exitosamente', frecuenciacambio });
      } else {
        res.status(404).json({ message: 'Frecuencia de cambio no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la frecuencia de cambio' });
    }
  };

  const deleteFrecuenciaCambio = async (req, res) => {
    const { idFrecuenciaCambio } = req.params;
    console.log(idFrecuenciaCambio);
    try {
      const frecuenciacambio = await deleteFrecuenciaCambioById(idFrecuenciaCambio);
      if (frecuenciacambio.affectedRows > 0) {
        res.json({ message: 'Frecuencia de cambio eliminada exitosamente' });
      } else {
        res.status(404).json({ message: 'Frecuencia de cambio no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar la frecuencia de cambio' });
    }
  };

  const updateFrecuenciaCambio = async (req, res) => {
    const { idFrecuenciaCambio } = req.params;
    const frecuenciaCambioData = req.body;
    try {
      const resultado = await updateFrecuenciaCambioById(idFrecuenciaCambio, frecuenciaCambioData);
      if (resultado.affectedRows > 0) {
        res.json({ message: 'Frecuencia de cambio actualizada exitosamente', resultado });
      } else {
        res.status(404).json({ message: 'Frecuencia de cambio no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al actualizar la frecuencia de cambio', details: error.message });
    }
  };
  module.exports = { postFrecuenciaCambio, getAllFrecuenciaCambiosCont, getFrecuenciaCambioByIDCont, deleteFrecuenciaCambio, updateFrecuenciaCambio};