const { Router } = require('express');
const {
    postTipoUnidad,
    getAllTipoUnidadCont,
    deleteTipoUnidad,
    updateTipoUnidad
} = require('../controllers/tipounidad');

const router = Router();

// CREAR
router.post('/', postTipoUnidad);

// OBTENER
router.get('/', getAllTipoUnidadCont);

// ELIMINAR
router.delete('/:id', deleteTipoUnidad);

// ACTUALIZAR
router.put('/:id', updateTipoUnidad); 

module.exports = router;
