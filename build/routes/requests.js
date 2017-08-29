'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _request = require('../models/request');

var _request2 = _interopRequireDefault(_request);

var _book = require('../models/book');

var _book2 = _interopRequireDefault(_book);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/myRequests', _authenticate2.default, function (req, res) {
    var user_id = req.currentUser.id;

    _request2.default.query({
        where: { buyer_id: user_id }
    }).fetchAll().then(function (requests) {
        res.json(requests);
    });
});

router.get('/requestsToYou', _authenticate2.default, function (req, res) {
    var user_id = req.currentUser.id;

    _request2.default.query({
        where: { seller_id: user_id }
    }).fetchAll().then(function (requests) {
        res.json(requests);
    });
});

router.post('/', _authenticate2.default, function (req, res) {
    var book_id = req.body.book_id;

    var user_id = req.currentUser.id;
    var username = req.currentUser.get('username');

    _request2.default.query({
        where: { book_id: book_id }
    }).fetch().then(function (request) {
        if (!request) {
            _book2.default.query({
                where: { id: book_id }
            }).fetch().then(function (book) {
                if (book) {
                    if (book.get('user_id') != user_id) {
                        _user2.default.query({
                            where: { id: book.get('user_id') }
                        }).fetch().then(function (seller) {
                            _request2.default.forge({
                                book_id: book_id,
                                book_title: book.get('title'),
                                buyer_id: user_id,
                                buyer_username: username,
                                seller_id: book.get('user_id'),
                                seller_username: seller.get('username'),
                                status: 'pending'
                            }, { hasTimestamps: true }).save().then(function (request) {
                                res.json(request);
                            }).catch(function (err) {
                                res.status(500).json({ success: false, error: err });
                            });
                        });
                    } else res.status(403).json({ error: 'There is not possible to borrow your own book' });
                } else res.status(403).json({ error: 'There is no book with such id' });
            });
        } else res.status(403).json({ error: 'This book is already borrowed' });
    });
});

router.put('/', _authenticate2.default, function (req, res) {
    var _req$body = req.body,
        id = _req$body.id,
        status = _req$body.status;


    if (status) {
        _request2.default.query({
            where: { id: id }
        }).fetch().then(function (request) {
            if (request) {
                request.set({ status: status });
                request.save();
                res.json(request);
            } else res.status(403).json({ error: 'There is no request with such book_id or seller_id' });
        });
    } else res.status(403).json({ error: { status: 'This field is required' } });
});

router.delete('/:id', _authenticate2.default, function (req, res) {
    _request2.default.query({
        where: { id: req.params.id }
    }).fetch().then(function (request) {
        if (request) {
            request.destroy();
            res.json(request);
        } else res.status(403).json({ error: 'There is no request with such id' });
    });
});

exports.default = router;
//# sourceMappingURL=requests.js.map