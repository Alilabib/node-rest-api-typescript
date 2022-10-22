import express from 'express';
import helmet from 'helmet';
import mongoose  from 'mongoose';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import postRoute from './routes/postRoutes';
import userRoute from './routes/userRoutes';
class Server{
   public app: express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        const MONGO_URI = 'mongodb://localhost/restapit';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL)
        .then(db=> console.log('DB is connected'))
        .catch(err=>console.log('error connection' + err));
        //settings
        this.app.set('port', process.env.PORT || 3000);
        // Middelwares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes(){
       // this.app.get('/',(req, res)=> res.send('Hello'));
       this.app.use(indexRoutes);
       this.app.use('/api/posts/',postRoute);
       this.app.use('/api/users/',userRoute);
    }

    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on Port ', this.app.get('port'));
        });
    }
}

const server = new Server();

server.start();