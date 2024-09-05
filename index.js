//* Es  necesario escribir type en package.json para habilitar los imports
//* Iniciar servidor = npm run 

import express from 'express'
import dotenv from "dotenv"
import conectarDB from './config/bd.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import router from './routes/tareaRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())

dotenv.config()

conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function (origin, callback) {
        // console.log(origin)
        if(whitelist.includes(origin)){
            // Puede consultar la API
            callback(null, true)
        }else{
            callback(new Error('Error de Cors'))
        }
    }
}

app.use(cors(corsOptions));

// * Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', router);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 4000");
})

//socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout:60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

io.on("connection", (socket) => {
    console.log('Conectado a socket proyectos')

    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto)
    })
 
    socket.on('nueva tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('nuevo estado', tarea)
    })
})