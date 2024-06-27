const Especialidad = require('../models/EspecialidadMedica');
const { createEspecialidad, getAllEspecialidad, eliminateEspecialidad, updatingEspecialidad } = require('../models/EspecialidadMedica');

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
    const delespecialidad = await eliminateEspecialidad(idEspecialidad);
    res.status(201).json({ message: 'Especialidad eliminada exitosamente', Especialidad: delespecialidad });
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al eliminar la Especialidad' });
  }
};

const updateEspecialidad = async (req, res) => {
  const idEspecialidad = req.params.idEspecialidad;
  const { especialidad } = req.body; 

  if (especialidad === undefined) {
    return res.status(400).json({ error: 'hay campos undefined' });
  }

  console.log(`id controllers updating: ${idEspecialidad}`);
  try {
    const updespecialidad = await updatingEspecialidad(idEspecialidad, { especialidad });
    res.status(201).json({ message: 'Especialidad actualizada exitosamente', especialidad: updespecialidad });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar la Especialidad' });
  }

};

module.exports = { postEspecialidad, getAllEspecialidades, deleteEspecialidades, updateEspecialidad };