const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Maintenance } = require('../models');

router.get('/welcome', (req, res) => {
    if (req.session.loggedIn) {
        res.render('welcome');
    }
    return;
});

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/welcome');
    }

    res.render('homepage');
});

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/');
//         return;
//     }
//     res.render("login");
// });

module.exports = router;