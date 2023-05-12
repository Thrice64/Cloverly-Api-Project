#!/usr/bin/env node
const program = require('commander');
const api = require('./api');
const { saveSearch } = require('./history');

program
  .version('1.0.0')
  .description('CLI for FoodData Central API');

program
  .command('search <keyword>')
  .alias('s')
  .description('Search for food items by keyword')
  .action(async keyword => {
    const results = await api.search(keyword);
    console.log(`Search results for '${keyword}':`);
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.description} (ID: ${result.fdcId})`);
    });
    saveSearch(keyword, results.length);
  });

program
  .command('details <id>')
  .alias('d')
  .description('Get details of a food item by ID')
  .action(async id => {
    const details = await api.getDetails(id);
    console.log(`Details for item with ID '${id}':`);
    console.log(`Description: ${details.description}`);
    console.log(`Food group: ${details.foodGroup}`);
    console.log(`Scientific name: ${details.scientificName}`);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
