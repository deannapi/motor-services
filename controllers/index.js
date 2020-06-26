const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const loginRoutes = require('./login-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;