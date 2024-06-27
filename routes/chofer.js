const { Router } = require('express');
const {
  getAllChoferesCont,
  postChofer,
  deleteChofer,
  updateChofer,
  getChoferesByCedulaCont,
  getChoferesNombreYIdCont,
  getChoferesNomCont,
  deleteAllChoferesCont
} = require('../controllers/chofer');

const router = Router();

// CREAR
router.post('/', postChofer);

// OBTENER
router.get('/', getAllChoferesCont);
router.get('/nombre', getChoferesNomCont);
router.get('/idChofer/:idChofer', getChoferesNombreYIdCont);
router.get('/cedula/:cedula', getChoferesByCedulaCont);


// ELIMINAR
router.delete('/:cedula', deleteChofer);
router.delete('/', deleteAllChoferesCont);

// ACTUALIZAR
router.put('/:cedula', updateChofer);

module.exports = router;
