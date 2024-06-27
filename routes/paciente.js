const { validatePaciente, validateID } = require('../validators/paciente');
const { Router } = require('express');

const router = Router();

const {
  getAllPacientesCont,
  getAllPacienteAcompananteCont,
  getPacienteCont,
  getPacienteAcompananteCont,
  postPacienteCont,
  deletePacienteCont,
  updatePacienteCont
} = require('../controllers/paciente');

router.get('/', getAllPacientesCont);

router.get('/acompanantes/', getAllPacienteAcompananteCont);

router.get('/:id',validateID, getPacienteCont);

router.get('/acompanantes/:id',validateID, getPacienteAcompananteCont);

router.post('/',validatePaciente, postPacienteCont);

router.delete('/:id',validateID, deletePacienteCont);

router.put('/:id',validateID,validatePaciente, updatePacienteCont);

module.exports = router;