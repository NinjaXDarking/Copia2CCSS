const { Router } = require('express');
const {
    postTipoUnidad,
    getAllTipoUnidadCont, deleteTipoUnidad, updateTipoUnidad
} = require('../controllers/tipounidad');

const router = Router();

//CREAR
router.post('/', postTipoUnidad);

//OBTENER
router.get('/', getAllTipoUnidadCont);

//ELIMINAR
router.delete('/eliminar/:id', deleteTipoUnidad);

//ACTUALIZAR
router.put('/actualizar/:id', updateTipoUnidad); 

module.exports = router;