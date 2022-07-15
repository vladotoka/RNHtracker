const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    //req.body contains an object with passed to request email an password
    const { email, password } = req.body;
    try {
        //creating new user instance
        const user = new User({ email, password });
        //saving user to mongoDB
        await user.save();

        //creating jwtoken
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY'); //FIXME

        res.send({ token });
        console.log(`New user was created with email: ${email}`);

    } catch (err) {
        return res.status(422).send(err.message)
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY'); //FIXME
        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;