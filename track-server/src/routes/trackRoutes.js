const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res, next) => {
    const tracks = await Track.find({ userId: req.user._id });

    res.send(tracks);
    next(); // pass control to the next handler
});

module.exports = router;