const viaje = require('../models/viajeCita');
const { getCitasForViajes } = require('../models/viajeCita');

const getCitas = async (req, res) => {
 try {
    const citasResult = await getCitasForViajes();

    if (citasResult.success) {
        res.status(200).json({ message: 'Citas obtenidas exitosamente', citas: citasResult.citas });
    } else {
        res.status(404).json({ message: citasResult.message });
    }

 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las citas' });
 }
}

module.exports = { getCitas };