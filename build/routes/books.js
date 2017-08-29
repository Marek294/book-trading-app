'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _book = require('../models/book');

var _book2 = _interopRequireDefault(_book);

var _request = require('../models/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', _authenticate2.default, function (req, res) {
    var _req$body = req.body,
        book_id = _req$body.book_id,
        title = _req$body.title,
        authors = _req$body.authors,
        image_thumbnail = _req$body.image_thumbnail;

    var user_id = req.currentUser.id;

    _book2.default.forge({ book_id: book_id, user_id: user_id, title: title, authors: authors, image_thumbnail: image_thumbnail }, { hasTimestamps: true }).save().then(function (book) {
        res.json({ success: true, book: book });
    }).catch(function (err) {
        res.status(500).json({ success: false, error: err });
    });
});

router.get('/:query', _authenticate2.default, function (req, res) {
    if (req.params.query == 'user') {
        _book2.default.query({
            where: { user_id: req.currentUser.id }
        }).fetchAll().then(function (books) {
            res.json({ success: true, books: books });
        });
    } else if (req.params.query == 'all') {
        _request2.default.fetchAll().then(function (requests) {
            var requestIds = [];

            requests.map(function (request) {
                requestIds.push(request.get('book_id'));
            });

            _book2.default.query('whereNotIn', 'id', requestIds).fetchAll().then(function (books) {
                res.json({ success: true, books: books });
            });
        });
    } else res.status(403).json({ success: false, error: 'Wrong query' });
});

router.delete('/:id', _authenticate2.default, function (req, res) {
    _book2.default.query({
        where: { id: req.params.id },
        andWhere: { user_id: req.currentUser.id }
    }).fetch().then(function (book) {
        if (book) {
            book.destroy();
            res.json({ success: true, book: book });
        } else {
            res.status(500).json({ success: false, error: 'There is no book with provided id' });
        }
    });
});

exports.default = router;
//# sourceMappingURL=books.js.map