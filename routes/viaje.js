const {Router}=require('express');

const router=Router();


const {
    getAllviajess,
    getAllRelacionViajesCitas,
    postViaje,
    getIdViajesByIdUnidad,
    //deleteViaje,
    //updateViaje,
    UpdateViajeCita,
    DeleteViajeCita,
    getAllviajessById
}=require('../controllers/viaje');


router.get('/relaciones/',   getAllRelacionViajesCitas);
router.get('/unidades/:idUnidad',   getIdViajesByIdUnidad);
router.get('/',   getAllviajess);
router.post('/',  postViaje);
router.get('/:idViaje',   getAllviajessById);
//router.delete('/:idViaje',  deleteViaje);
router.delete('/cita/:idCita',  DeleteViajeCita);
router.put('/actualizar/viajeCita', UpdateViajeCita);
//router.put('/',  updateViaje);

module.exports=router; 

