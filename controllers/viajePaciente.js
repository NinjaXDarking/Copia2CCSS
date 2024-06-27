const viaje = require('../models/viajePaciente');
const { getPacientesForViajes } = require('../models/viajePaciente');

const getPacientes = async (req, res) => {
 try {
    const pacientesResult = await getPacientesForViajes();

    if (pacientesResult.success) {
        res.status(200).json({ message: 'Pacientes obtenidos exitosamente', pacientes: pacientesResult.pacientes });
    } else {
        res.status(404).json({ message: pacientesResult.message });
    }

 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pacientes' });
 }
}

module.exports = { getPacientes };