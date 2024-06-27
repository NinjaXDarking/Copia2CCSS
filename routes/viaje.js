const {Router}=require('express');

const router=Router();


const {
    getAllviajess,
    getAllRelacionViajesCitas,
    postViaje,
    //deleteViaje,
    updateViaje,
    UpdateViajeCita,
    DeleteViajeCita,
    getAllviajessById
}=require('../controllers/viaje');


router.get('/relaciones/',   getAllRelacionViajesCitas);


router.get('/',   getAllviajess);

router.post('/',  postViaje);

router.get('/:idViaje',   getAllviajessById);

//router.delete('/:idViaje',  deleteViaje);

router.delete('/:idCita',  DeleteViajeCita);

router.put('/', UpdateViajeCita);

router.put('/:idViaje',  updateViaje);

module.exports=router; 

