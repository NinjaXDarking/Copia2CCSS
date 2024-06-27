// routes/servicioRoutes.js
const express = require('express');
const servicioController = require('../controllers/servicioController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

const router = express.Router();

// Obtener todos los servicios (Protegido)
router.get('/', servicioController.getAllServicios);

// Obtener un servicio por su ID (Protegido)
router.get('/:id', servicioController.getServicioById);

// Crear un nuevo servicio (Protegido)
router.post('/', servicioController.createServicio);

// Actualizar un servicio existente por su ID (Protegido)
router.put('/:id', servicioController.updateServicio);

// Eliminar un servicio por su ID (Protegido)
router.delete('/:id',authMiddleware, servicioController.deleteServicio);

module.exports = router;
