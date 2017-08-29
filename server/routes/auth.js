import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    User.query({
        where: { username: usernameOrEmail },
        orWhere: { email: usernameOrEmail }
    }).fetch().then(user => {
        if(user) {
            if(bcrypt.compareSync(password,user.get('password_digest'))) {

                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username')
                }, config.jwtSecret);

                res.json({ success: true, token: token});

            } else res.status(400).json({ success: false, errors: { form: 'Invalid authentication' } });
        } else res.status(400).json({ success: false, errors: { form: 'Invalid authentication' } });
    })

});

export default router;