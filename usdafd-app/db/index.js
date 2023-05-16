const { MongoClient } = require('mongodb');

const config = require('../config.json');

/**
 * @description         es6 style module to support mongo connection adn crud operations
 * @return {Object}     object containing functions
 */
const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cluster0.onzz7o7.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;

    let db = null;

    /**
     * @description         connects to mongo atlas via url and sets db instance
     */
    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs an insert into the specified collection
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} data              data object to insert into mongo collection
     */
    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    /**
     * @description                      performs a query on a mongo collection by foodId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} foodIdentifier    deckId to query
     * @return {Object or Array}         the card object by food id or all results
     */
    async function find(collectionName, foodDescription) {
        try {
            const collection = db.collection(collectionName);

            if (foodDescription) {
                return await collection.find({ searchTerm: foodDescription}).next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs an update on a mongo collection by foodId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} foodIdentifier    foodId to query
     * @param {Object} data              data to update into mongo collection
     */
    async function update(collectionName, foodIdentifier, data) {
        try {

            const collection = db.collection(collectionName);
            if(data.selections) {
                await collection.updateOne(
                    { searchTerm: foodIdentifier },
                    { $set: { lastSearched: data.lastSearched },
                     $push: { selections: data.selections } }
                   );
            }else {
                await collection.updateOne(
                    { searchTerm: foodIdentifier },
                    { $set: data }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        find,
        update
    };
};

module.exports = mongo();
