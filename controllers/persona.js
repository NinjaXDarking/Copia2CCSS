const { getAllPersona, getPersona, createPersona, updatePersona, deletePersona } = require('../models/persona');

const getAllPersonaCont = async (req, res) => {
  try {
    const personas = await getAllPersona();
    res.json({ message: 'Personas obtenidas exitosamente', personas });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener las personas' });
  }
};

const getPersonaCont = async (req, res) => {
  const personaId = req.params.id;
  try {
    const persona = await getPersona(personaId);
    res.json({ message: 'Persona obtenida exitosamente', persona });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const createPersonaCont = async (req, res) => {
  const personaData = req.body;
  try {
    const nuevaPersona = await createPersona(personaData);
    res.status(201).json({ message: 'Persona creada exitosamente', persona: nuevaPersona });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const updatePersonaCont = async (req, res) => {
  const personaId = req.params.id;
  const newData = req.body;

  try {
    const updatedPersona = await updatePersona(personaId, newData);
    res.status(200).json({ message: 'Persona actualizada exitosamente', persona: updatedPersona });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const deletePersonaCont = async (req, res) => {

  console.log(req.params.id);

  const personaId = req.params.id;
  
  try {
    await deletePersona(personaId);
    res.status(200).json({ message: 'Persona eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllPersonaCont, getPersonaCont, createPersonaCont, updatePersonaCont, deletePersonaCont };
