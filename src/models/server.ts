import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRoutes from '../routers/usuario.routers';
import db from '../db/connection';


export default class Server {

    private app: express.Application;
    private port:string;
    private apiPaths = {
        usuarios: '/api/usuarios',

    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }   

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Body
        this.app.use( express.json() );
        //Public
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('DB ONLINE');
            
        } catch (er:any)
        {
            throw new Error( er );
        }
    }

    routes(){
        this.app.use( this.apiPaths.usuarios, userRoutes )
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server online on the port: ${this.port}`);
        });
    }
}