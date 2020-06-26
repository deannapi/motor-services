const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Maintenance } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    res.json(req.session);
})

module.exports = router;