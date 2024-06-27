const {Router}=require('express');

const { getCitas }=require('../controllers/viajeCita');

const router=Router();

router.get('/',  getCitas);

module.exports=router;