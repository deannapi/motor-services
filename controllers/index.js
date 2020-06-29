const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const milesRoutes = require('./mileage-routes');
const apiRoutes = require('./api');
const costRoutes = require('./cost-routes');

router.use('/', homeRoutes);
// router.use('/login', loginRoutes);
router.use('/mileage', milesRoutes);
router.use('/api', apiRoutes);
router.use('/cost', costRoutes);

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;