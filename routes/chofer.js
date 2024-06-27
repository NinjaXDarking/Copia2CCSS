const { Router } = require('express');
const {
  getAllChoferesCont,
  postChofer,
  deleteChofer,
  updateChofer,
  getChoferesByCedulaCont, 
  getChoferesNomCont,
  deleteAllChoferesCont
} = require('../controllers/chofer');

const router = Router();

// CREAR
router.post('/', postChofer);

// OBTENER
router.get('/', getAllChoferesCont);
router.get('/nombre', getChoferesNomCont);
router.get('/:cedula', getChoferesByCedulaCont);

// ELIMINAR
router.delete('/:id', deleteChofer);
router.delete('/', deleteAllChoferesCont);

// ACTUALIZAR
router.put('/:id', updateChofer);

module.exports = router;
