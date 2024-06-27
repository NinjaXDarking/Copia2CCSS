const {Router}=require('express');

const router=Router();


const {
    getAllviajess,
    postViaje,
    deleteViaje,
    updateViaje,
    getAllviajessById
}=require('../controllers/viaje');

router.get('/',   getAllviajess);

router.post('/',  postViaje);

router.get('/:idViaje',   getAllviajessById);

router.delete('/:idViaje',  deleteViaje);

router.put('/:idViaje',  updateViaje);

module.exports=router; 

