const express= require('express')
const router = express.Router();
const tareatoController = require('../controllers/tareaController')
const auth = require('../middelware/auth')
const {check} = require('express-validator')


//CREAR UNA NUEVA TAREA
//API/TAREA

router.post('/',auth,
[check('nombre','El Nombre es obligatorio').not().isEmpty(),
check('proyecto','El Proyecto es obligatorio').not().isEmpty()],
tareatoController.crearTarea)

router.get('/',auth,
tareatoController.obtenerTareas)

//Actualizar Tarea
router.put('/:id',auth,
tareatoController.actualizarTarea)

//Eliminar Tarea
router.delete('/:id',auth,
tareatoController.eliminarTarea)

module.exports=router