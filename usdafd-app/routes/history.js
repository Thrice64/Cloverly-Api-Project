const router = require('express').Router();
const database = require('../db');

router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;

        let history;

        if (searchTerm) {
            history = await database.find('Results', searchTerm);
        } else {
            history = await database.find('Results');
        }

        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.toString() });
    }
});

module.exports = router;
