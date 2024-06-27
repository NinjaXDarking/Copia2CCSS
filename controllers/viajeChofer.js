const viaje = require('../models/viajeChofer');
const { getViajesForChofer } = require('../models/viajeChofer');

const getViajesChofer = async (req, res) => {
 try {
    const viajesResult = await getViajesForChofer();

    if (viajesResult.success) {
        res.status(200).json({ message: 'Viajes obtenidos exitosamente', viajes: viajesResult.viajes });
    } else {
        res.status(404).json({ message: viajesResult.message });
    }

 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los viajes' });
 }
}

module.exports = { getViajesChofer };