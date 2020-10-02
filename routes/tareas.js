const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const auth = require('../middelware/auth');
const { check } = require('express-validator')

//crear tarea
//api/tareas
router.post('/',
    auth,[
        check('nombre', 'El nombre es obligarotiro').not().isEmpty(),
        check('proyecto', 'El proyecto es obligarotiro').not().isEmpty()
    ],
    tareasController.crearTarea
);

//obtener las tareas por proyecto
router.get('/',
    auth,
    tareasController.obtenerTareas
);

//actualizar tareas
router.put('/:id',
    auth,
    tareasController.actualizarTarea
)

//eliminar tarea
router.delete('/:id',
    auth,
    tareasController.eliminarTarea
)

module.exports = router;