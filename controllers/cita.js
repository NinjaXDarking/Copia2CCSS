const { createCita, actualizarCita, eliminarCita, obtenerCitas } = require('../models/cita');

const postCita = async (req, res) => {
  const citaData = req.body;
  try {
    const nuevaCita = await createCita(citaData);
    if (nuevaCita.success) {
      res.status(201).json({ message: 'Cita creada exitosamente', citaId: nuevaCita.citaId });
    } else {
      res.status(400).json({ message: nuevaCita.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la cita' });
  }
};

const getCitas = async (req, res) => {
  try {
    const citas = await obtenerCitas();
    res.status(200).json(citas); 
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

const deleteCita = async (req, res) => {
  const idCita = req.params.idCita;
  console.log(`idCita controllers delete: ${idCita}`);
  try {
    const delCita = await eliminarCita(idCita);
    res.status(201).json({ message: 'Cita eliminada exitosamente', Cita: delCita });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al eliminar la Cita' });
  }
};

const putCita = async (req, res) => {
  try {
    const idCita = req.params.idCita;
    const datosCita = req.body;

    const resultado = await actualizarCita(idCita, datosCita);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postCita, deleteCita, putCita, getCitas };
