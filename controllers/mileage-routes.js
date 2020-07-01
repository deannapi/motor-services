const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('add-mileage', {loggedIn: true}); // This needs fix?
});

module.exports = router;