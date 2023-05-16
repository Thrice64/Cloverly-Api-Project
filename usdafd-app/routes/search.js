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
    const { headers, originalUrl, query } = req;
    const splitUrl = originalUrl.split('/').filter((str) => str !== '');
    const [first, second] = splitUrl;
    if (splitUrl.length === 1 && first === 'search') {
        query.metadata = {
            agent: headers['user-agent'],
        };
    }

    if(first.includes('term')){
        console.log('searched');
        query.metadata = {
            lastSearched: new Date()
        };
    }

    if (splitUrl.length === 3 && first === 'search' && second !== null) {
        console.log('searched ID');
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
            await database.update('Results', term, {lastSearched: metadata.lastSearched});
       } else {
            await database.save('Results', {searchTerm: term, searchCount: selection.totalHits, lastSearched: metadata.lastSearched});
       };

      
    } catch (error) {
        res.status(error);
    }
});

router.get('/:fdcId/details', async(req,res) => {
    try{
            const { params, query } = req;
            const { searched, metadata } = query; 
        
        if (params['fdcId']){
            const cut = params['fdcId'].indexOf("=");
            params['fdcId'] = params['fdcId'].slice(cut+1);
        }
        const results = await foodapp.searchID(params['fdcId']);
        
        const selection = {
            foodId: results.fdcId,
            display: results.description
        }

        const history = await database.find('Results', searched);
        if(history.selections){
            await database.update('Results', searched, {lastSearched: metadata.lastSearched, 
                selections: selection});
        }else{
            await database.update('Results', searched, {lastSearched: metadata.lastSearched, 
                selections: selection});
        }
        
       return res.status(200).json(results);
       
    } catch (error){
            res.status(error);
    }

});

module.exports = router;