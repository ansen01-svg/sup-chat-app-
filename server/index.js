require('dotenv').config();
require('express-async-errors');

//socket modules
let express = require('express');
let net = require('net');
let http = require('http');
let num_processes = require('os').cpus().length;
let cluster = require('cluster');
let socketio = require('socket.io');
let farmHash = require('farmhash');
let redisAdapter = require('socket.io-redis');
let socketMain = require('./socket_main');
let connectDb = require('./utils/connect_db');

//express modules
let rateLimiter = require('express-rate-limit');
let cors = require('cors');
let helmet = require('helmet');
let xss_clean = require('xss-clean');
let mongoSanitize = require('express-mongo-sanitize');
let cookieParser = require('cookie-parser');
let fileUpload = require('express-fileupload');
let cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

//middlewares
let authRouter = require('./routes/auth');
let userRouter = require('./routes/users');
let errorHandler = require('./middlewares/error_handler');
let pageNotFound = require('./middlewares/page_not_found');


if (cluster.isMaster) {
    
    let workers = [];
    
    let spawn = function(i) {
        workers[i] = cluster.fork();
    
        workers[i].on('exit', function(code, signal) {
            spawn(i);
        });
    };
    
    for (var i = 0; i < num_processes; i++) {
        spawn(i);
    }
    
    const worker_index = function(ip, len) {
        return farmHash.fingerprint32(ip) % len;
    };
    
    const server = net.createServer({ pauseOnConnect: true }, (connection) =>{
        let worker = workers[worker_index(connection.remoteAddress, num_processes)];
        worker.send('sticky-session:connection', connection);
    });
    server.listen(process.env.PORT, () => console.log(`master is listening on port ${process.env.PORT}...`));

} else {

    let app = express();

    app.set('trust proxy', 1);
    app.use(rateLimiter({
        windowMs : 15 * 60 * 1000,
        max : 60
    }));
    app.use(cors());
    app.use(helmet());
    app.use(xss_clean());
    app.use(mongoSanitize());

    app.use(express.json());
    app.use(express.static('./public'));
    app.use(cookieParser(process.env.JWT_SECRET));
    app.use(fileUpload({ useTempFiles : true }));

    app.use('/apis/v1/auth', authRouter);
    app.use('/apis/v1/users', userRouter);

    app.use(pageNotFound);
    app.use(errorHandler);

    let server = app.listen(0, 'localhost');
    console.log(`worker ${cluster.worker.id} is listening`);

    let start = async () => {
        try {
            await connectDb(process.env.MONGO_URI);
            console.log('connected to db');
        } catch (error) {
            console.log(error)
        }
    }
    start();

    let io = socketio(server, {
        cors : { origin : process.env.ORIGIN }
    });
    io.adapter(redisAdapter({ host : 'localhost', port : 6379 }));

    io.on('connection', socket => {
        socketMain(io, socket);
    })

    process.on('message', (message, connection) => {
        if (message !== 'sticky-session:connection') return;

        server.emit('connection', connection);
        connection.resume();
    })
}