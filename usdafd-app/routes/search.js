const router = require('express').Router();

const { query } = require('express');
const database = require('../db');
const foodapp = require('usdafd-module');


router.use((req, res, next) => {
    const { headers, originalUrl, querl } = req;
    const splitUrl = OrininalUrl.split('/').filter((str) => str !== '');
    const [first, second] = splitUrl;

    if(splitUrl.length === 1 && first === 'search') {
        query.metadata = {
            agent: headers['user-agent'],
            searchStart: new Date()
        };
    }

    if (splitUrl.length === 2 && first === 'search' && second !==undefined) {
        query.metadata = {
            searchEnd: new Date()
        };
    }

    next();
});

router.get('/', async (req, res) => {
    try {
       const { query } = req;
       const { } = query;

       
    } catch (error) {
        res.status(error);
    }
});

module.exports = router;