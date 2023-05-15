const router = require('express').Router();

const { query } = require('express');
const database = require('../db');
const foodapp = require('usdafd-module');

const _formatFoods = (foods) => {
    return foods.map((food) => {
        return {
            display: `${food.description}`,
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
            lastSearched: new Date()
        };
    }

    next();
});

router.get('/', async (req, res) => {
    try {
       const { query } = req;
       const { term, metadata } = query;
       
       const selection = await foodapp.search(term);

       const foods = _formatFoods(selection.foods);

       const results = {searchTerm: term, results: foods};

       res.json(results);

       const history = await database.find('Results', term);
       if (history) {
            await database.update('Results', term, {$inc: { searchCount: 1 },
             lastSearched: metadata.lastSearched})
       } else {
            await database.save('Results', {searchTerm: term, searchCount: 1,
                 lastSearched: metadata.lastSearched})
       };

      
    } catch (error) {
        res.status(error);
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