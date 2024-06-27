//const Paciente = require('../models/paciente');
const { getAllPacientes, getAllPacienteAcompanante, getPacienteAcompanante, getPaciente, deletePaciente, createPaciente, updatePaciente } = require('../models/paciente');

const getAllPacientesCont = async (req, res) => {
  try {
    const pacientes = await getAllPacientes();
    res.json({ message: 'Pacientes obtenidos exitosamente', pacientes });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener los pacientes' });
  }
};

const getAllPacienteAcompananteCont = async (req, res) => {
  try {
    const pacientes = await getAllPacienteAcompanante();
    res.json({ message: 'Pacientes obtenidos exitosamente', ...pacientes });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener los pacientes' });
  }
};
const getPacienteCont = async (req, res) => {
  const idPaciente = req.params.id;
  try {
    const paciente = await getPaciente(idPaciente);
    res.json({ message: 'Paciente obtenido exitosamente', paciente });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getPacienteAcompananteCont = async (req, res) => {
  const idPaciente = req.params.id;
  try {
    const paciente = await getPacienteAcompanante(idPaciente);
    res.json({ message: 'Paciente obtenido exitosamente', ...paciente });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const deletePacienteCont = async (req, res) => {
  const id = req.params.id;
  console.log(`ID del paciente para eliminar: ${id}`);
  try {
    const delPaciente = await deletePaciente(id);
    res.status(201).json({ message: 'Paciente eliminado exitosamente', paciente: delPaciente });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const postPacienteCont = async (req, res) => {
  const pacienteData = req.body;
  try {
    const nuevoPaciente = await createPaciente(pacienteData);
    res.status(201).json({ message: 'Paciente creado exitosamente', paciente: nuevoPaciente });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const updatePacienteCont = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const updPaciente = await updatePaciente(id, newData);
    res.status(201).json({ message: 'Paciente actualizado exitosamente', paciente: updPaciente });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPacientesCont, getAllPacienteAcompananteCont, getPacienteCont, getPacienteAcompananteCont, deletePacienteCont, postPacienteCont, updatePacienteCont };
