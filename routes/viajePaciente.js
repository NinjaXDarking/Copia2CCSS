const {Router}=require('express');

const router=Router();

const { getPacientes }=require('../controllers/viajePaciente');

router.get('/',   getPacientes);

module.exports=router;