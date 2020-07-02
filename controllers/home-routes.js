const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Maintenance } = require('../models');

router.get('/welcome', (req, res) => {
    if (req.session.loggedIn) {
        res.render('welcome', {loggedIn: true});
        return;
    }
    res.render('homepage');
    return;
});

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/welcome');
        return;
    }

    res.render('homepage');
    return;
});

module.exports = router;