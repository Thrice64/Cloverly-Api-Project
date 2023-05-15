const router = require('express').Router();

const { query } = require('express');
const database = require('../db');
const foodapp = require('usdafd-module');


router.use((req, res, next) => {
    const { headers, originalUrl, querl } = req;
    const splitUrl = originalUrl.split('/').filter((str) => str !== '');
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

const _formatFoods = (foods) => {
    return foods.map((food) => {
        return {
            description: `${food.description, food.foodCategory}`,
            foodId: food.fdcId
        };
    });
};

router.get('/', async (req, res) => {
    try {
       const { query } = req;
       const { term } = query;
       const selection = await foodapp.search(term);
       console.log(selection);
       const foods = _formatFoods(selection.foods);

       res.json(foods);
       
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;