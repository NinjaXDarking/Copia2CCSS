const { validateUsuario, validateID, validateLogin } = require('../validators/usuario');
const { Router } = require('express');


const router = Router();

const {
  getAllUsuariosCont,
  getUsuarioCont,
  postUsuarioCont,
  postLoginCont,
  deleteUsuarioCont,
  updateUsuarioCont
} = require('../controllers/usuario');

router.get('/', getAllUsuariosCont);

router.get('/:id', validateID, getUsuarioCont);

router.post('/', validateUsuario, postUsuarioCont);

router.post('/login/',validateLogin, postLoginCont);

router.delete('/:id', validateID, deleteUsuarioCont);

router.put('/:id', validateID, validateUsuario, updateUsuarioCont);

module.exports = router;
