const { getAllAcompanante, getAcompanante, deleteAcompanante, createAcompanante, updateAcompanante} = require('../models/acompanante');

const getAllAcompananteCont = async (req, res) => {
  try {
    const acompanantes = await getAllAcompanante();
    res.json({ message: 'Acompañantes obtenidos exitosamente', acompanantes });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener los acompañantes' });
  }
};

const getAcompananteCont = async (req, res) => {
  const idAcompanante = req.params.id;
  try {
    const acompanante = await getAcompanante(idAcompanante);
    res.json({ message: 'Acompañante obtenido exitosamente', acompanante });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteAcompananteCont = async (req, res) => {
  const id = req.params.id;
  console.log(`id controllers delete: ${id}`);
  try {
    const delAcompanante = await deleteAcompanante(id);
    res.status(201).json({ message: 'Acompañante eliminado exitosamente', acompanante: delAcompanante });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message  });
  }
};

const postAcompananteCont = async (req, res) => {
  const acompananteData = req.body;
  try {

    const nuevoAcompanante = await createAcompanante(acompananteData);
    res.status(201).json({ message: 'Acompañante creado exitosamente', acompanante: nuevoAcompanante });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const updateAcompananteCont = async (req, res) => {
  const id = req.params.id;
  const  newData  = req.body;


  try {
    const updAcompanante = await updateAcompanante(id,  newData );
    res.status(201).json({ message: 'Acompañante actualizado exitosamente', acompanante: updAcompanante });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }

}


module.exports = { getAllAcompananteCont, getAcompananteCont, deleteAcompananteCont, postAcompananteCont,updateAcompananteCont };

