const router = require('express').Router();

const database = require('../db');

router.get('/', async (req, res) => {
    try {
        const history = await database.find('History');
        res.json(history);
    }  catch (error) {
        res.status(error);
    }
});

module.exports = router;