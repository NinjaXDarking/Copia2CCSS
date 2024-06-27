const { createTipoRecurso, getAllTipoRecursos, getRecursosByID, deleteTipoRecursoById, updateTipoRecursoById } = require('../models/tiporecurso');

const postTipoRecurso = async (req, res) => {
    try {
      const recursoData = req.body;
      const result = await createTipoRecurso(recursoData);
      res.status(201).json({ message: 'Tipo de recurso creado', data: result });
    } catch (error) {
      if (error.message === 'El idTipoRecurso ya existe') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al crear el tipo de recurso', error: error.message });
      }
    }
  };

  //RETORNA TODOS LOS RECURSOS.
  const getAllTipoRecursosCont = async (req, res) => {
    try {
        const tiporecurso = await getAllTipoRecursos();
        res.json({ message: 'Tipo de recurso obtenidas exitosamente',tiporecurso });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error al obtener todos los tipos de recursos'});
    }
  };

  const getRecursosByTipoCont = async (req, res) => {
    const { idTipoRecurso } = req.params;
    try {
      const tiporecurso = await getRecursosByID(idTipoRecurso);
      res.json({ message: 'Recurso obtenido exitosamente', tiporecurso });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el recurso' });
    }
  };

  const deleteTipoRecurso = async (req, res) => {
    const { id } = req.params;
    try {
      const tiporecurso = await deleteTipoRecursoById(id);
      res.json({ message: 'Tipo de recurso eliminado exitosamente', tiporecurso });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar el tipo de recurso' });
    }
  };

//ACTUALIZAR
const updateTipoRecurso = async (req, res) => {
  const { id } = req.params;
  const recursoData = req.body;
  try {
    const resultado = await updateTipoRecursoById(id, recursoData);
    res.json({ message: 'Tipo de recurso actualizado exitosamente', resultado });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el tipo de recurso', details: error.message });
  }
};
 

  module.exports = { postTipoRecurso, getAllTipoRecursosCont, getRecursosByTipoCont, deleteTipoRecurso, updateTipoRecurso};