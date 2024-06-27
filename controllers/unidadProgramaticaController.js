const unidadProgramaticaModel = require('../models/UnidadProgramatica');

// Obtener todas las unidades programáticas
const getAllUnidadesProgramaticas = async (req, res) => {
    try {
        const unidadesProgramaticas = await unidadProgramaticaModel.getAllUnidadesProgramaticas();
        res.json(unidadesProgramaticas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todas las unidades programáticas' });
    }
};

module.exports = {
    getAllUnidadesProgramaticas
};
