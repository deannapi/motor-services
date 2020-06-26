const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Maintenance } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    res.json(req.session);
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render("login");
});

module.exports = router;