const { Router } = require('express');
const {
    postTipoRecurso,
    getAllTipoRecursosCont, getRecursosByTipoCont, deleteTipoRecurso, updateTipoRecurso
} = require('../controllers/tiporecurso');

const router = Router();

//CREAR
router.post('/', postTipoRecurso);

//OBTENER
router.get('/', getAllTipoRecursosCont);
router.get('/obtener/:idTipoRecurso', getRecursosByTipoCont);

//ELIMINAR
router.delete('/eliminar/:id', deleteTipoRecurso);

//ACTUALIZAR
router.put('/actualizar/:id', updateTipoRecurso); 

module.exports = router;