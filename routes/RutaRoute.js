// routes/RutaRoutes.js

const express = require('express');
const {
    getRutas,
    getRuta,
    createNuevaRuta,
    updateRutaExistente,
    deleteRutaExistente
} = require('../controllers/RutaController'); // Asegúrate de que la ruta al controlador sea correcta

const router = express.Router();

// Definición de rutas
router.get('/', getRutas); // Obtener todas las rutas
router.get('/:id', getRuta); // Obtener una ruta por ID
router.post('/', createNuevaRuta); // Crear una nueva ruta
router.put('/:id', updateRutaExistente); // Actualizar una ruta por su ID
router.delete('/:id', deleteRutaExistente); // Eliminar una ruta por su ID

module.exports = router;
