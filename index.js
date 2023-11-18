import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import {mongoConnection, sqlConnection} from './database/config.mjs';
import fileupload from 'express-fileupload';
import { Server } from 'socket.io';
import { socketController } from './sockets/controller.mjs'

import { noEncontradoRouter } from './api/no-encontrado/noEncontrado-router.mjs';
import { authRouter } from './api/auth/auth-router.mjs';
import { usuarioRouter } from './api/usuario/ususario-router.mjs';
import { multimediaRouter } from './api/multimedia/multimedia-router.mjs';
import { publicacionesRouter } from './api/publicacion/publicacion-router.mjs';

class Servidor{
    constructor(){
        this.app = express();
        this.server = createServer(this.app);
        this.io = new Server(this.server);
        //this.conectarMongo();
        this.conectarsql();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    async conectarMongo(){ await mongoConnection(); }
    async conectarsql(){ await sqlConnection(); }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended: true}) );
        this.app.use( express.static('public') );
        this.app.use( fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }) );
    }

    routes(){
        this.app.use('/api/auth', authRouter );
        this.app.use('/api/usuarios', usuarioRouter );
        this.app.use('/multimedia', multimediaRouter );
        this.app.use('/api/publicaciones', publicacionesRouter);
        
        this.app.use('/', noEncontradoRouter);
    }

    sockets(){ this.io.on('connection', socketController); }

    listen(){
        this.server.listen( process.env.APP_PORT, () => {
            console.log(`Corriendo en el puerto ${process.env.APP_PORT}`);
        } )
    }
}



const servidor = new Servidor();
servidor.listen();