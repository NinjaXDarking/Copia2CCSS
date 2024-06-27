const {Router}=require('express');

const router=Router();


const {
    getAllEspecialidades,
    postEspecialidad,
    deleteEspecialidades,
    updateEspecialidad
}=require('../controllers/EspecialidadMedica');

router.get('/',   getAllEspecialidades);

router.post('/',  postEspecialidad);

router.delete('/:idCentro',  deleteEspecialidades);

router.put('/:idCentro',  updateEspecialidad);

module.exports=router;