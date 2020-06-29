const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('cost', {loggedIn: true});
});

module.exports = router;