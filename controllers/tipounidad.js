const { createTipoUnidad, getAllTipoUnidad, deleteTipoUnidadById, updateTipoUnidadById } = require('../models/tipounidad');

const postTipoUnidad = async (req, res) => {
  try {
    const unidadData = req.body;
    const result = await createTipoUnidad(unidadData);
    res.status(201).json({ message: 'Tipo de unidad creada', data: result });
  } catch (error) {
    if (error.message === 'El idTipoUnidad ya existe') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear el tipo de unidad', error: error.message });
    }
  }
};

//RETORNA TODOS LOS unidadS.
const getAllTipoUnidadCont = async (req, res) => {
  try {
    const tipounidad = await getAllTipoUnidad();
    res.json({ message: 'Tipo de unidad obtenidas exitosamente', tipounidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener todos los tipos de unidad' });
  }
};

const deleteTipoUnidad = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const tipoUnidad = await deleteTipoUnidadById(id);
    res.json({ message: 'Tipo de unidad eliminada exitosamente', tipoUnidad });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al eliminar el tipo de unidad' });
  }
};

//ACTUALIZAR
const updateTipoUnidad = async (req, res) => {
  const { id } = req.params;
  const unidadData = req.body;
  try {
    const resultado = await updateTipoUnidadById(id, unidadData);
    res.json({ message: 'Tipo de unidad actualizada exitosamente', resultado });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el tipo de unidad', details: error.message });
  }
};


module.exports = { postTipoUnidad, getAllTipoUnidadCont, deleteTipoUnidad, updateTipoUnidad };