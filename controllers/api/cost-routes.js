const { Cost } = require('../../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    Cost.findAll()
    .then(dbCostData => {
        if (!dbCostData) {
            res.status(404).json({ message: 'Data not found'});
            return;
        }
        res.json(dbCostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Cost.create({
        date: req.body.date,
        description: req.body.description,
        price: req.body.price,
        user_id: req.session.user_id
    })
    .then(dbCostData => res.json(dbCostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;