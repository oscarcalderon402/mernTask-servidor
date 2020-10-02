//rutas para autentificar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middelware/auth');
const authController = require('../controllers/authController')

//iniciar seccion
//api/usuario
router.post('/',
    authController.autenticarUsuario
);

//obtiene el usuario autenticad
router.get('/',
    auth,
    authController.usuarioAutenticado 
);

module.exports = router;
