const {Router}=require('express');

const router=Router();


const { getUnidades }=require('../controllers/viajeUnidades');

router.get('/',   getUnidades);

module.exports=router;