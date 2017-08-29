'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _books = require('./routes/books');

var _books2 = _interopRequireDefault(_books);

var _requests = require('./routes/requests');

var _requests2 = _interopRequireDefault(_requests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import webpackConfig from '../webpack.config.dev';
var app = (0, _express2.default)();
//import socket from 'socket.io';

var server = _http2.default.Server(app);

var webpackConfig;
if (process.env.NODE_ENV = 'production') webpackConfig = require('../webpack.config.prod');else webpackConfig = require('../webpack.config.dev');

var compiler = (0, _webpack2.default)(webpackConfig);

app.use((0, _webpackDevMiddleware2.default)(compiler));
app.use((0, _webpackHotMiddleware2.default)(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(_bodyParser2.default.urlencoded());
app.use(_bodyParser2.default.json());
app.use(_express2.default.static('public'));
app.use((0, _morgan2.default)('dev'));

app.use('/api/users', _users2.default);
app.use('/api/authenticate', _auth2.default);
app.use('/api/books', _books2.default);
app.use('/api/requests', _requests2.default);

app.get('*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../public/index.html'));
});

var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port ' + port);
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
//# sourceMappingURL=index.js.map