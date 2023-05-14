
// verify phone function needs to be fixed just used as a sample
const superagent = require('superagent');

// base url to use for request
const base = 'https://api.nal.usda.gov/fdc/v1';

// insert your api key for veriphone here
const apiKey = ""; // api key here

// search api function to search by phone number and/or country_code id
const search= async (food) => {
    try {
        const verifyURL = `${base}/food/${food}?api_key=${apiKey}`;
        
        const res = await superagent.get(verifyURL);
        console.log(res.body);
    } catch (error) {
        console.log(error);
    }
};

search(1104067);

module.exports = {
    search
};