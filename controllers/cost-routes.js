const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('logbook');
});

module.exports = router;