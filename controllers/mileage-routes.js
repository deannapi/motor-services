const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('add-mileage');
});

module.exports = router;