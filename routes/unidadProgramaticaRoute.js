// routes/unidadProgramaticaRoutes.js
const express = require('express');
const router = express.Router();
const unidadProgramaticaController = require('../controllers/unidadProgramaticaController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

// Obtener todas las unidades programáticas (Protegido)
router.get('/', unidadProgramaticaController.getAllUnidadesProgramaticas);

module.exports = router;
