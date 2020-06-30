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
    // Expects id, frequency of maintencance, mileage, user_id
    Maintenance.create({
        frequency: req.body.frequency,
        maintenance_type: req.body.maintenance_type
    })
    .then(dbMaintenanceData => res.json(dbMaintenanceData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    // Expects frequency, mileage, type
    Maintenance.update(
        {
            frequency: req.body.frequency,
            maintenance_type: req.body.maintenance_type
        },
        {
        where: {
            id: req.params.id
        }
    })
    .then(dbMaintenanceData => {
        if(!dbMaintenanceData){
            res.status(404).json({ message: 'No maintenance type found with this id' })
            return;
        }
        res.json(dbMaintenanceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Maintenance.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbMaintenanceData => {
        if(!dbMaintenanceData){
            res.status(404).json({ message: 'No maintenance data found with this id' });
            return;
        }
        res.json(dbMaintenanceData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;