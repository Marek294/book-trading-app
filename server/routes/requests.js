import express from 'express';
import authenticate from '../middlewares/authenticate';

import Request from '../models/request';
import Book from '../models/book';
import User from '../models/user';

let router = express.Router();

router.get('/myRequests',authenticate,(req,res) => {
    const user_id = req.currentUser.id;

    Request.query({
        where: { buyer_id: user_id}
    }).fetchAll().then(requests => {
        res.json(requests);
    })
});

router.get('/requestsToYou',authenticate,(req,res) => {
    const user_id = req.currentUser.id;

    Request.query({
        where: { seller_id: user_id}
    }).fetchAll().then(requests => {
        res.json(requests);
    })
});

router.post('/', authenticate, (req,res) => {
    const { book_id } = req.body;
    const user_id = req.currentUser.id;
    const username = req.currentUser.get('username');

    Request.query({
        where: { book_id: book_id }
    }).fetch().then(request => {
        if(!request) {
            Book.query({
                where: { id: book_id }
            }).fetch().then(book => {
                if(book) {
                    if(book.get('user_id') != user_id) {
                        User.query({
                            where: { id: book.get('user_id') }
                        }).fetch().then(seller => {
                            Request.forge({
                                book_id,
                                book_title: book.get('title'),
                                buyer_id: user_id,
                                buyer_username: username,
                                seller_id: book.get('user_id'),
                                seller_username: seller.get('username'),
                                status: 'pending'
                            }, {hasTimestamps: true}).save()
                                .then(request => {
                                    res.json(request);
                                })
                                .catch(err => {
                                    res.status(500).json({success: false, error: err});
                                })
                        })
                    }
                    else res.status(403).json({ error: 'There is not possible to borrow your own book'});
                } else res.status(403).json({ error: 'There is no book with such id'});
            })
        } else res.status(403).json({ error: 'This book is already borrowed' });
    });
});

router.put('/',authenticate,(req, res) => {
    const { id, status } = req.body;

    if(status) {
        Request.query({
            where: {id: id}
        }).fetch().then(request => {
            if(request) {
                request.set({ status: status });
                request.save();
                res.json(request);
            } else res.status(403).json({error: 'There is no request with such book_id or seller_id'});
        })
    } else res.status(403).json({error: { status: 'This field is required' }});
});

router.delete('/:id', authenticate, (req,res) => {
    Request.query({
        where: {id : req.params.id}
    }).fetch().then(request => {
        if(request) {
            request.destroy();
            res.json(request);
        } else res.status(403).json({ error: 'There is no request with such id'});
    })
});

export default router;