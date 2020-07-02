const router = require('express').Router();
const maintenanceRoute = require('./maintenance-routes');
const userRoute = require('./user-routes');
const costRoute = require('./cost-routes')

router.use('/users', userRoute);
router.use('/maintenance', maintenanceRoute);
router.use('/cost', costRoute)

module.exports = router;