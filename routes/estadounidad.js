const { Router } = require('express');
const {
    postEstadoUnidad,
    getAllEstadosUnidadCont,
    getEstadoUnidadByIDCont,
    deleteEstadoUnidad, 
    updateEstadoUnidad
} = require('../controllers/estadounidad');


const router = Router();

// CREAR
router.post('/', postEstadoUnidad);

// OBTENER
router.get('/', getAllEstadosUnidadCont);
router.get('/:idEstado', getEstadoUnidadByIDCont);

// ELIMINAR
router.delete('/:idEstado', deleteEstadoUnidad);

// ACTUALIZAR
router.put('/:idEstado', updateEstadoUnidad);

module.exports = router;
