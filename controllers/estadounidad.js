const { createEstadoUnidad, getAllEstadosUnidad, getEstadoUnidadByID, deleteEstadoUnidadById, updateEstadoUnidadById}= require('../models/estadounidad')

const postEstadoUnidad = async (req, res) => {
    try {
      const estadoUnidadData = req.body; 
      const result = await createEstadoUnidad(estadoUnidadData); 
      res.status(201).json({ message: 'Estado de unidad creado', data: result }); 
    } catch (error) {
      if (error.message === 'El idEstado ya existe') { 
        res.status(400).json({ message: error.message }); 
      } else {
        res.status(500).json({ message: 'Error al crear el estado de unidad', error: error.message }); 
      }
    }
  };

  const getAllEstadosUnidadCont = async (req, res) => {
    try {
      const estadosUnidad = await getAllEstadosUnidad();
      res.json({ message: 'Estados de unidad obtenidos exitosamente', estadosUnidad });
    } catch (error) {
      console.error('Error al obtener los estados de unidad:', error);
      res.status(500).json({ message: 'Error al obtener los estados de unidad' });
    }
  };

  const getEstadoUnidadByIDCont = async (req, res) => {
    const { idEstado } = req.params;
    try {
      const estadoUnidad = await getEstadoUnidadByID(idEstado);
      res.json({ message: 'Estado de unidad obtenido exitosamente', estadoUnidad });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el estado de unidad' });
    }
  };

  const deleteEstadoUnidad = async (req, res) => {
    const { idEstado } = req.params;
    console.log(idEstado);
    try {
      const estadoUnidad = await deleteEstadoUnidadById(idEstado);
      res.json({ message: 'Estado de unidad eliminado exitosamente', estadoUnidad });
    } catch (error) {
      console.error('Error al eliminar el estado de unidad:', error);
      res.status(400).json({ error: 'Error al eliminar el estado de unidad' });
    }
  };

  const updateEstadoUnidad = async (req, res) => {
    const { idEstado } = req.params;
    const estadoUnidadData = req.body;
    try {
      const resultado = await updateEstadoUnidadById(idEstado, estadoUnidadData);
      res.json({ message: 'Estado de unidad actualizado exitosamente', resultado });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al actualizar el estado de unidad', details: error.message });
    }
  };

  module.exports={postEstadoUnidad, getAllEstadosUnidadCont, getEstadoUnidadByIDCont, deleteEstadoUnidad, updateEstadoUnidad};