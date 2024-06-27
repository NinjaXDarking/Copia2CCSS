const { 
  createChofer, 
  getAllChoferes, 
  deleteChoferByCedula, 
  updateChoferByCedula, 
  getChoferesByCedula,
  getChoferesNom,
  deleteAllChoferes 
} = require('../models/chofer');

// CREA Chofer
const postChofer = async (req, res) => {
  const choferData = req.body;
  try {
    const nuevoChofer = await createChofer(choferData);
    res.status(201).json({ message: 'Chofer creado exitosamente', nuevoChofer });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el chofer', details: error.message });
  }
};

// RETORNA TODAS LOS CHOFERES
const getAllChoferesCont = async (req, res) => {
  try {
    const choferes = await getAllChoferes();
    res.json({ message: 'Choferes obtenidos exitosamente', choferes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los choferes' });
  }
};

// RETORNA CHOFER POR CEDULA
const getChoferesByCedulaCont = async (req, res) => {
  const { cedula } = req.params;
  try {
    const chofer = await getChoferesByCedula(cedula);
    res.json({ message: 'Chofer obtenido exitosamente', chofer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el chofer por cedula' });
  }
};

//RETORNA EL NOMBRE DEL CHOFER
const getChoferesNomCont = async (req, res) => {
  try {
    const choferes = await getChoferesNom();
    res.json({ message: 'Choferes obtenidos exitosamente', choferes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los choferes' });
  }
};

// ELIMINA CHOFER POR ID
const deleteChofer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteChoferByCedula(id);
    res.json({ message: 'Chofer eliminado exitosamente', result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al eliminar el chofer', details: error.message });
  }
};

// ELIMINA TODOS LOS CHOFERES
const deleteAllChoferesCont = async (req, res) => {
  try {
    const result = await deleteAllChoferes();
    res.json({ message: 'Todos los choferes eliminados exitosamente', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar todos los choferes', details: error.message });
  }
};

// ACTUALIZA CHOFER POR ID
const updateChofer = async (req, res) => {
  const { id } = req.params;
  const choferData = req.body;
  try {
    const result = await updateChoferByCedula(id, choferData);
    res.json({ message: 'Chofer actualizado exitosamente', result });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el chofer', details: error.message });
  }
};

module.exports = { 
  postChofer, 
  getAllChoferesCont, 
  deleteChofer, 
  updateChofer, 
  getChoferesByCedulaCont, 
  getChoferesNomCont,
  deleteAllChoferesCont 
};
