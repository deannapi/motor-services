const router = require('express').Router();
const maintenanceRoute = require('./maintenance-routes');
const userRoute = require('./user-routes');

router.use('/users', userRoute);
router.use('/maintenance', maintenanceRoute);

module.exports = router;