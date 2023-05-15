
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');

// base url to use for request
const base = 'https://api.nal.usda.gov/fdc/v1';

// insert your api key for veriphone here
const apiKey = ""; // api key here

// search api function to search by phone number and/or country_code id
const searchID = async (food_id) => {
    try {
        const idURL = `${base}/food/${food_id}?api_key=${apiKey}
        &format=abridged&nutrients=203%2C204%2C205%2C206%2C207`;
        
        const res = await superagent.get(idURL);
        return (res.body);
    } catch (error) {
        console.log(error);
    }
};

const search = async (query) => {
    try {
       const queryURL = `${base}/foods/search?api_key=${apiKey}&query=${query}&dataType=Foundation,
       Survey%20%28FNDDS%29,SR%20Legacy&pageSize=25&pageNumber=2&sortBy=dataType.keyword&sortOrder=asc` 

       const res = await superagent.get(queryURL);
       return res.body;
    } catch (error) {
        console.log(error);
    }
};
// test
//searchID(1104067);
//search('Cheddar cheese');

module.exports = {
    searchID,
    search
};