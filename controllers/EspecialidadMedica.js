const { createEspecialidad, getAllEspecialidad, eliminarEspecialidad, updatingEspecialidad } = require('../models/EspecialidadMedica');

const postEspecialidad = async (req, res) => {
    const especialidadData = req.body;
    try {
        const newEspecialidad = await createEspecialidad(especialidadData);
        res.status(201).json({ message: 'Especialidad registrado exitosamente', Especialidad: newEspecialidad });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar el Especialidad' });
    }
};

const getAllEspecialidades = async (req, res) => {
  try {
    const Especialidad = await getAllEspecialidad();
    res.json({ message: 'especialidades obtenidas correctamente', Especialidad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las especialidades' });
  }
};

const deleteEspecialidades = async (req, res) => {
  const idEspecialidad = req.params.idEspecialidad;
  console.log(`id controllers delete: ${idEspecialidad}`);
  try {
    const delespecialidad = await eliminarEspecialidad(idEspecialidad);
    res.status(201).json({ message: 'Especialidad eliminada exitosamente', Especialidad: delespecialidad });
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar la Especialidad' });
  }
};

const updateEspecialidad = async (req, res) => {
  try {
    const idEspecialidad = req.params.idEspecialidad; 
    const especialidadData = req.body; 

    if (!especialidadData.Especialidad) {
      return res.status(400).json({ error: 'El campo Especialidad es requerido' });
    }

    const resultado = await updatingEspecialidad(idEspecialidad, especialidadData);

    res.status(200).json({ 
      message: 'Especialidad actualizada exitosamente', 
      especialidad: resultado 
    }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { postEspecialidad, getAllEspecialidades, deleteEspecialidades, updateEspecialidad };