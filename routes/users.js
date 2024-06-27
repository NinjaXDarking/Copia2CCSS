const {Router}=require('express');

const router=Router();


const {
  getMethod,
  postMethod,
  putMethod,
  deleteMethod}=require('../controllers/users');

//Devolver datos desde mi API
router.get('/',   getMethod);

//Registrar o insertar
router.post('/',  postMethod);

//Eliminar
router.delete('/', putMethod);

//Actualizar
router.put('/:id',    deleteMethod);


module.exports=router;

