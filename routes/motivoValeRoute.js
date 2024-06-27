// routes/motivoValeRoutes.js
const express = require('express');
const motivoValeController = require('../controllers/motivoValeController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

const router = express.Router();

// Obtener todos los motivos (Protegido)
router.get('/', motivoValeController.getAllMotivos);

// Obtener un motivo por su ID (Protegido)
router.get('/:id', motivoValeController.getMotivoById);

// Crear un nuevo motivo (Protegido)
router.post('/', motivoValeController.createMotivo);

// Actualizar un motivo existente por su ID (Protegido)
router.put('/:id',authMiddleware, motivoValeController.updateMotivo);

// Eliminar un motivo por su ID (Protegido)
router.delete('/:id',authMiddleware, motivoValeController.deleteMotivo);

module.exports = router;
