const router = require('express').Router();

// const apiRoutes = require('./api');

// router.use('/api', apiRoutes);

const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;