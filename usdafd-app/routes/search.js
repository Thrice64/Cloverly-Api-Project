const router = require('express').Router();

const { query } = require('express');
const database = require('../db');
const foodapp = require('usdafd-module');

const _formatFoods = (foods) => {
    return foods.map((food) => {
        return {
            description: `${food.description}`,
            category: `${food.foodCategory}`,
            foodId: food.fdcId
        };
    });
};

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

router.get('/', async (req, res) => {
    try {
       const { query } = req;
       const { term } = query;

       const selection = await foodapp.search(term);

       const foods = _formatFoods(selection.foods);

       res.json(foods);
       
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

router.get('/:fdcId', async(req,res) => {
    try{
            const { params } = req;
        
        if (params['fdcId']){
            const cut = params['fdcId'].indexOf("=");
            params['fdcId'] = params['fdcId'].slice(cut+1);
        }
        const results = await foodapp.searchID(params['fdcId']);

        
        console.log(results);
        return res.status(200).json(results);
    } catch (error){
            res.status(error);
    }

});

module.exports = router;