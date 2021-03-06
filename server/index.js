import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
//import socket from 'socket.io';
import http from 'http';

//import webpackConfig from '../webpack.config.dev';
import users from './routes/users';
import auth from './routes/auth';
import books from './routes/books';
import requests from './routes/requests';

let app = express();
let server = http.Server(app);

var webpack;
var webpackMiddleware;
var webpackHotMiddleware;
var webpackConfig;

if(process.env.NODE_ENV.trim() === 'development') {
    webpack = require('webpack');
    webpackMiddleware = require('webpack-dev-middleware');
    webpackHotMiddleware = require('webpack-hot-middleware');

    webpackConfig = require('../webpack.config.dev');
    const compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));

app.use('/api/users', users);
app.use('/api/authenticate', auth);
app.use('/api/books', books);
app.use('/api/requests', requests);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

app.set('port', (process.env.PORT || 3000));

server.listen(app.get('port'), function() {
    console.log('Server listening at port '+ app.get('port'));
});

// // Setup socket
// var io = socket(server);
//
// io.on('connection', function(socket) {
//     console.log('Connection was made ' + socket.id);
//     socket.on('CHANGE_REQUEST', function(data) {
//         console.log(data);
//         socket.broadcast.emit('SERVER_CHANGE_REQUEST', data);
//     });
// });

// Expose app
exports = module.exports = app;