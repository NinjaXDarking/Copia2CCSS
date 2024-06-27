const viaje = require('../models/viajeUnidades');
const { getUnidadesForViajes } = require('../models/viajeUnidades');

const getUnidades = async (req, res) => {
 try {
    const unidadesResult = await getUnidadesForViajes();

    if (unidadesResult.success) {
        res.status(200).json({ message: 'Unidades obtenidas exitosamente', unidades: unidadesResult.unidades });
    } else {
        res.status(404).json({ message: unidadesResult.message });
    }

 } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las unidades' });
 }
}

module.exports = { getUnidades };