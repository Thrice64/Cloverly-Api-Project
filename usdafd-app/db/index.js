const fs = require('fs');
const path = require('path');

const FILE_NAME = '';
const FULL_PATH = path.resolve(__dirname, FILE_NAME);

const save = async (data) => {
    try {
        const results = require(FILE_NAME);
        results.push(data);

        await fs.promises.writeFile(FULL_PATH, JSON.stringify(results));
    } catch (error) {
        console.error(error);
    }
};

const find = (id) => {
    try {
        const results = require(FILE_NAME);

        if (id) {
            const item = results.find((result) => {
                return result.deckId === id;
            });

            return item;
        } else {
            return results;
        }
    } catch (error) {
        console.error(error);
    }
};

const update = async (id, data) => {
    try {
        const results = require(FILE_NAME);
        let deck = find(id);
        if (deck) {
            console.log('update starting')
            deck.metadata.gameEnd = data.metadata.gameEnd;
            deck.final = data.finalHand;

            await fs.promises.writeFile(FULL_PATH, JSON.stringify(results));
        }
    } catch (error) {
        console.log(error);
    }
};
// HOMEWORK #2

module.exports = {
    save,
    find,
    update
};
