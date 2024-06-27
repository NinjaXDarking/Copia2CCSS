const {Router}=require('express');

const router=Router();


const {
  //  getAllCitasCont,
    getCitas,
    postCita,
    putCita,
    deleteCita
}=require('../controllers/cita');

//Devolver datos desde mi API
//router.get('/',   getAllCitasCont);
//router.get('/:id',   getCitaById);
router.get('/',   getCitas);

//Registrar o insertar
router.post('/',  postCita);

//Eliminar
router.delete('/:idCita', deleteCita);

//Actualizar
router.put('/:idCita',  putCita);


module.exports=router;