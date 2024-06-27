const {Router}=require('express');

const { getViajesChofer }=require('../controllers/viajeChofer');

const router=Router();

router.get('/',  getViajesChofer);

module.exports=router;