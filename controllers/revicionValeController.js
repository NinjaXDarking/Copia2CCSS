// controllers/revicionValeController.js

const { createRevicionVale, getRevicionVales } = require('../models/RevisionVale');

// Controlador para obtener todas las revisiones de vales
const getAllRevicionValesCont = async (req, res) => {
    try {
        const revicionVales = await getRevicionVales();
        res.status(200).json({ message: "Mostrando desde el metodo get", revicionVales });
    } catch (error) {
        console.error('Error fetching RevicionVales:', error);
        res.status(500).json({ error: 'Error fetching RevicionVales' });
    }
};

// Controlador para crear una nueva revisión de vale
const postRevicionVale = async (req, res) => {
    try {
        const nuevoRevicionVale = await createRevicionVale(req.body);
        res.status(201).json({ message: "Revisión correctamente registrada", nuevoRevicionVale });
    } catch (error) {
        console.error('Error creating RevicionVale:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postRevicionVale,
    getAllRevicionValesCont
};
