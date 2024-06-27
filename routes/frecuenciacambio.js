const { Router } = require('express');
const { postFrecuenciaCambio, getAllFrecuenciaCambiosCont, getFrecuenciaCambioByIDCont, deleteFrecuenciaCambio, updateFrecuenciaCambio
   
} = require('../controllers/frecuenciacambio');

const router = Router();

//CREAR
router.post('/', postFrecuenciaCambio);

//OBTENER
router.get('/', getAllFrecuenciaCambiosCont);
router.get('/:idFrecuenciaCambio', getFrecuenciaCambioByIDCont);

//ELIMINAR
router.delete('/:idFrecuenciaCambio', deleteFrecuenciaCambio);

//ACTUALIZAR
router.put('/:idFrecuenciaCambio', updateFrecuenciaCambio);

module.exports = router;