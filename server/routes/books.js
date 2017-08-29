import express from 'express';
import authenticate from '../middlewares/authenticate';

import Book from '../models/book';
import Request from '../models/request';

let router = express.Router();

router.post('/', authenticate, (req,res) => {
    const { book_id, title, authors, image_thumbnail } = req.body;
    const user_id = req.currentUser.id;

    Book.forge({ book_id, user_id, title, authors, image_thumbnail }, { hasTimestamps: true }).save()
        .then(book => {
            res.json({ success: true, book: book});
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err});
        })
});

router.get('/:query', authenticate, (req,res) => {
    if(req.params.query == 'user') {
        Book.query({
            where: { user_id: req.currentUser.id }
        }).fetchAll().then((books) => {
            res.json({ success: true, books: books });
        })
    } else if(req.params.query == 'all') {
        Request.fetchAll().then(requests => {
            const requestIds = [];

            requests.map(request => {
                requestIds.push(request.get('book_id'));
            });

            Book.query('whereNotIn', 'id', requestIds).fetchAll().then((books) => {
                res.json({ success: true, books: books });
            });
        });

    } else res.status(403).json({ success: false, error: 'Wrong query'})
});

router.delete('/:id', authenticate, (req,res) => {
     Book.query({
         where: { id: req.params.id },
         andWhere: { user_id: req.currentUser.id }
     }).fetch().then(book => {
         if(book) {
             book.destroy();
             res.json({success: true, book: book});
         } else {
             res.status(500).json({ success: false, error: 'There is no book with provided id'});
         }
     });
});

export default router;