const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectosController');
const auth = require('../middelware/auth');
const { check } = require('express-validator')

//crear proyectos
//api/proyectos
router.post('/',
    auth,[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)
//obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

//actualizar proyecto ID
router.put('/:id',
    auth,[
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;