const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

//crea una nueva tarea
exports.crearTarea = async (req,res) => {
     //revisar si hay errores
     const errores = validationResult(req);
     if( !errores.isEmpty() ) {
             return res.status(400).json({errores: errores.array()})
     }

     
     try {
         //extreer el proyecto y comprobar si existe
         const { proyecto } = req.body;
         const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //creamos la tarea 
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

     } catch (error) {
         console.log (error);
         res.status(500).send('Hubo un error');

     }
}

//obtiene las tareas por proyecto
exports.obtenerTareas = async (req,res) => {
    try {
        //extreer el proyecto y comprobar si existe
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
       if(!existeProyecto) {
           return res.status(404).json({msg: 'Proyecto no encontrado'})
       }
    
       //revisar si el proyecto actual pertenece al usuario autenticado
       if(existeProyecto.creador.toString() !== req.usuario.id){
           return res.status(401).json({msg: 'No autorizado'})
       }

       //obtener las tareas por proyectos
       const tareas = await Tarea.find({ proyecto }).sort({creado: -1});
       res.json({ tareas });

    } catch (error) {
        console.log (error);
        res.status(500).send('Hubo un error');

    }
}

//actualizar tarea
exports.actualizarTarea = async (req,res) => {
    try {
         //extreer el proyecto y comprobar si existe
         const { proyecto, nombre, estado } = req.body;
         let tarea = await Tarea.findById(req.params.id);
         //si la tarea existe
        if(!tarea) {
            return res.status(404).json({msg: 'tarea no encontrada'})
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
     
        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //crear un objeto con la nueva informacion
        const nuevaTarea = {};

        
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        

        //guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, { new:true})
        res.json({tarea});
    } catch (error) {
        console.log (error);
        res.status(500).send('Hubo un error');

    }
}

//eliminar una tarea
exports.eliminarTarea = async (req,res) => {
    try {
         //extreer el proyecto y comprobar si existe
         const { proyecto} = req.query;
         let tarea = await Tarea.findById(req.params.id);
         //si la tarea existe
        if(!tarea) {
            return res.status(404).json({msg: 'tarea no encontrada'})
        }

        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
     
        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

         //eliminar proyecto
         await Tarea.findOneAndRemove({_id: req.params.id});
         res.json({msg:'Tarea Eliminardo'})

    } catch (error) {
        console.log (error);
        res.status(500).send('Hubo un error');

    }
}