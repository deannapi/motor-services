const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('logbook', {loggedIn: true});
});

module.exports = router;