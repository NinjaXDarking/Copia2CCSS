const { validateAcompanante, validateID } = require('../validators/acompanante');
const { Router } = require('express');

const router = Router();

const {
    getAllAcompananteCont,
    getAcompananteCont,
    postAcompananteCont,
    deleteAcompananteCont,
    updateAcompananteCont
} = require('../controllers/acompanante');

router.get('/', getAllAcompananteCont);

router.get('/:id',validateID, getAcompananteCont);

router.post('/', validateAcompanante, postAcompananteCont);

router.delete('/:id', validateID, deleteAcompananteCont);

router.put('/:id', validateID, validateAcompanante, updateAcompananteCont);

module.exports = router;
