// routes/acompañanteRoutes.js
const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionarioController'); // Cambié acompañantesController a funcionariosController
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware de autenticación

// Obtener todos los funcionarios (Protegido)
router.get('/', funcionariosController.getAllFuncionarios);

// Obtener un funcionario por su ID (Protegido)
router.get('/:id', funcionariosController.getFuncionarioById);

// Crear un nuevo funcionario (Protegido)
router.post('/',authMiddleware, funcionariosController.createFuncionario);

// Actualizar un funcionario existente por su ID (Protegido)
router.put('/:id',authMiddleware, funcionariosController.updateFuncionario);

// Eliminar un funcionario por su ID (Protegido)
router.delete('/:id',authMiddleware, funcionariosController.deleteFuncionario);

module.exports = router;
