const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', [
  body('Identificacion').notEmpty().withMessage('Identificación es requerida'),
  body('Nombre').notEmpty().withMessage('Nombre es requerido'),
  body('Apellido1').notEmpty().withMessage('Primer Apellido es requerido'),
  body('Apellido2').notEmpty().withMessage('Segundo Apellido es requerido'),
  body('Correo').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('Contrasena').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
], authController.register);

router.post('/login', [
  body('identificador').notEmpty().withMessage('Identificación o Correo es requerido'),
  body('Contrasena').notEmpty().withMessage('La contraseña es requerida')
], authController.login);

module.exports = router;
