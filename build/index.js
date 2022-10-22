"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/restapit';
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL)
            .then(db => console.log('DB is connected'))
            .catch(err => console.log('error connection' + err));
        //settings
        this.app.set('port', process.env.PORT || 3000);
        // Middelwares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        // this.app.get('/',(req, res)=> res.send('Hello'));
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/posts/', postRoutes_1.default);
        this.app.use('/api/users/', userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on Port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
