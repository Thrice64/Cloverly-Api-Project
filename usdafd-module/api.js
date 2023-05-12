const axios = require('axios');

exports.searchFoodItems = async function (searchTerm) {
  const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}`);
  return response.data.foods;
};

exports.getFoodItemDetails = async function (fdcId) {
  const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}`);
  return response.data;
};

