const MongoClient = require('mongodb').MongoClient;
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbname = 'products_db';

const get = async (asin) => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        const db = client.db(dbname);
        const result =  await db
            .collection('products')
            .findOne({asin: asin});
        console.log(result);
        client.close();
       return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const create = async (product) => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        const db = client.db(dbname);
        const result =  await db
        .collection('products')
        .insertOne(product);
        client.close();
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
};
const deleteProd = async(asin) => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        const db = client.db(dbname);
        const result =  await db
        .collection('products')
        .deleteOne({asin: asin});
        client.close();
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    get,
    create
};