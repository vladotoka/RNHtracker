const express = require('express');
const mongoose = require('mongoose');
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

        res.send(`New user was created with email: ${email}`);
        console.log(`New user was created with email: ${email}`);
    } catch (err) {
        return res.status(422).send(err.message)
    }
});

module.exports = router;