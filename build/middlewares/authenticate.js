'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
    var authorizationHeader = req.headers['authorizationtoken'];
    var token = void 0;

    if (authorizationHeader) token = authorizationHeader.split(' ')[1];

    if (token) {
        _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret, function (err, decoded) {
            if (err) {
                res.status(401).json({ error: 'Failed to authenticate' });
            } else {
                _user2.default.query({
                    select: ['id', 'username', 'email'],
                    where: { id: decoded.id }
                }).fetch().then(function (user) {
                    if (user) {
                        req.currentUser = user;
                        next();
                    } else {
                        res.status(404).json({ error: 'No such user' });
                    }
                });
            }
        });
    } else {
        res.status(403).json({ error: 'No token provided' });
    }
};
//# sourceMappingURL=authenticate.js.map