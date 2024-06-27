// routes/revicionVale.js
const { Router } = require('express');
const router = Router();
const { postRevicionVale, getAllRevicionValesCont} = require('../controllers/revicionValeController');
const authMiddleware = require("../middleware/authMiddleware"); // Importa el middleware de autenticación
const { validateRevicionVale } = require('../validators/revicionValeValidator');
// Ruta para crear una nueva revisión de vale

router.get('/', getAllRevicionValesCont);
router.post('/',authMiddleware,validateRevicionVale, postRevicionVale);

module.exports = router;
