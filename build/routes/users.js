'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _signup = require('../validations/signup');

var _signup2 = _interopRequireDefault(_signup);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
    var _signupValidations = (0, _signup2.default)(req.body),
        errors = _signupValidations.errors,
        isValid = _signupValidations.isValid;

    if (isValid) {
        var _req$body = req.body,
            username = _req$body.username,
            email = _req$body.email,
            password = _req$body.password;

        var password_digest = _bcrypt2.default.hashSync(password, 10);

        _user2.default.forge({ username: username, email: email, password_digest: password_digest }, { hasTimestamps: true }).save().then(function (user) {
            res.json({ success: true, user: user });
        }).catch(function (err) {
            res.status(500).json({ success: false, error: err });
        });
    } else res.status(400).json({ success: false, errors: errors });
});

router.get('/:value', function (req, res) {
    _user2.default.query({
        where: { username: req.params.value },
        orWhere: { email: req.params.value }
    }).fetch().then(function (user) {
        res.json({ user: user });
    });
});

exports.default = router;
//# sourceMappingURL=users.js.map