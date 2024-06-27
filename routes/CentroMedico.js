const {Router}=require('express');

const router=Router();


const {
    getAllCentro,
    postCentro,
    deleteCentro,
    updateCentro
}=require('../controllers/viaje');

router.get('/',   getAllCentro);

router.post('/',  postCentro);

router.delete('/:idCentro',  deleteCentro);

router.put('/:idCentro',  updateCentro);

module.exports=router;