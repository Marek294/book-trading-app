'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    var _req$body = req.body,
        usernameOrEmail = _req$body.usernameOrEmail,
        password = _req$body.password;


    _user2.default.query({
        where: { username: usernameOrEmail },
        orWhere: { email: usernameOrEmail }
    }).fetch().then(function (user) {
        if (user) {
            if (_bcrypt2.default.compareSync(password, user.get('password_digest'))) {

                var token = _jsonwebtoken2.default.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, _config2.default.jwtSecret);

                res.json({ success: true, token: token });
            } else res.status(400).json({ success: false, errors: { form: 'Invalid authentication' } });
        } else res.status(400).json({ success: false, errors: { form: 'Invalid authentication' } });
    });
});

exports.default = router;
//# sourceMappingURL=auth.js.map