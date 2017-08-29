import express from 'express';
import signupValidations from '../validations/signup';
import bcrypt from 'bcrypt';

import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
    let { errors, isValid } = signupValidations(req.body);
    if(isValid) {
        const { username, email, password } = req.body;
        const password_digest = bcrypt.hashSync(password,10);

        User.forge({ username, email, password_digest },{ hasTimestamps: true }).save()
            .then(user => {
                res.json({ success: true, user: user });
            })
            .catch(err => {
                res.status(500).json({ success: false, error: err });
            })

    } else res.status(400).json({ success: false, errors: errors });
});

router.get('/:value', (req, res) => {
    User.query({
        where: { username: req.params.value },
        orWhere: { email: req.params.value }
    }).fetch().then((user) => {
        res.json({ user: user });
    })
});

export default router;