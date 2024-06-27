const { validatePersona, validateID } = require('../validators/persona');
const { Router } = require('express');
const router = Router();

const {
    getAllPersonaCont,
    getPersonaCont,
    createPersonaCont,
    deletePersonaCont,
    updatePersonaCont
} = require('../controllers/persona');


// Obtener todas las personas
router.get('/', getAllPersonaCont);

// Obtener todas las personas
router.get('/:id',validateID, getPersonaCont);

// Crear una nueva persona
router.post('/', validatePersona, createPersonaCont);

// Eliminar una persona por su ID
router.delete('/:id', validateID, deletePersonaCont);

// Actualizar la información de una persona por su ID
router.put('/:id', validateID, validatePersona, updatePersonaCont);

module.exports = router;
