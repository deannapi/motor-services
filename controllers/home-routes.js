const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Maintenance } = require('../models');

router.get('/welcome', (req, res) => {
    if (req.session.loggedIn) {
        res.render('welcome', {loggedIn: true});
    }
    return;
});

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/welcome');
    }

    res.render('homepage');
});

module.exports = router;