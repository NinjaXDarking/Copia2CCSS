// routes/destinoRoutes.js
const express = require('express');
const destinoController = require('../controllers/destinoController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

const router = express.Router();

// Obtener todos los destinos (Protegido)
router.get('/', destinoController.getAllDestinos);

// Obtener un destino por su ID (Protegido)
router.get('/:id', destinoController.getDestinoById);

// Crear un nuevo destino (Protegido)
router.post('/', destinoController.createDestino);

// Actualizar un destino existente por su ID (Protegido)
router.put('/:id', destinoController.updateDestino);

// Eliminar un destino por su ID (Protegido)
router.delete('/:id', destinoController.deleteDestino);

module.exports = router;
