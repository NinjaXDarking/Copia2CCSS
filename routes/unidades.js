const { Router } = require('express');
const {
    getAllUnidadesCont,
    postUnidad,
    deleteUnidad,
    updateUnidad,
    getUnidadesByNumeroCont, deleteAllUnidadesCont
} = require('../controllers/unidad');

const router = Router();

//CREAR
router.post('/', postUnidad);

//OBTENER
router.get('/', getAllUnidadesCont);
router.get('/:numeroUnidad', getUnidadesByNumeroCont);

//ELIMINAR
router.delete('/:id', deleteUnidad);
//router.delete('/eliminar', deleteAllUnidadesCont);

//ACTUALIZAR
router.put('/:id', updateUnidad); 

module.exports = router;
