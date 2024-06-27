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

router.delete('/:idEspecialidad',  deleteEspecialidades);

router.put('/:idEspecialidad',  updateEspecialidad);

module.exports=router;