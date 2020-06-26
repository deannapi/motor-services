const { User, Maintenance, Cost } = require('../../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    Maintenance.findAll()
    .then(dbMaintenanceData => {
        if(!dbMaintenanceData){
            res.status(404).json({ message: 'Data not found' });
            return;
        }
        res.json(dbMaintenanceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // Expects id, date, mileage, user_id
    Maintenance.create({
        date: req.body.date,
        mileage: req.body.mileage,
        user_id: req.body.user_id
    })
    .then(dbMaintenanceData => res.json(dbMaintenanceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;