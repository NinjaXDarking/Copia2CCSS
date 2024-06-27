const { createUnidad, getAllUnidades, deleteUnidadById, updateUnidadById, getUnidadesByNumero, deleteAllUnidades } = require('../models/unidad');

//CREA UNIDADES
const postUnidad = async (req, res) => {
    const unidadData = req.body;
    try {
        const nuevaUnidad = await createUnidad(unidadData);
        res.status(201).json({ message: 'Unidad creada exitosamente'});
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear la unidad', error});
    }
};


// RETORNA TODAS LAS UNIDADES
const getAllUnidadesCont = async (req, res) => {
  try {
    const unidades = await getAllUnidades(); // Get all units
    res.json({ message: 'Unidades obtenidas exitosamente', unidades }); // Send success response
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ error: 'Error al obtener las unidades' }); // Send error response
  }
};

//RETONAR UNIDADES POR TIPO 
const getUnidadesByNumeroCont = async (req, res) => {
  const { numeroUnidad } = req.params;
  try {
    const unidades = await getUnidadesByNumero(numeroUnidad);
    res.json({ message: 'Unidades obtenidas exitosamente', unidades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las unidades por tipo' });
  }
};

//ELIMINA UNIDADES POR ID
const deleteUnidad = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const unidades = await deleteUnidadById(id);
    res.json({ message: 'Unidad eliminada exitosamente', unidades });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: 'Error al eliminar la unidad' }); 
  }
};

//ELIMINA TODAS LAS UNIDADES
const deleteAllUnidadesCont = async (req, res) => {
  try {
    const result = await deleteAllUnidades();
    res.json({ message: 'Todas las unidades eliminadas exitosamente', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar todas las unidades' });
  }
};


//ACTUALIZA UNIDADES
const updateUnidad = async (req, res) => {
  const { id } = req.params;
  const unidadData = req.body;
  try {
      const resultado = await updateUnidadById(id, unidadData);
      res.json({ message: 'Unidad actualizada exitosamente', resultado });
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al actualizar la unidad', details: error.message });
  }
};

module.exports = { postUnidad, getAllUnidadesCont, deleteUnidad, updateUnidad, getUnidadesByNumeroCont, deleteAllUnidadesCont };