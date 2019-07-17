jest.mock('mongodb');

const {get,create} = require('../../services/data_access');

describe('Test for data_access', () => {

    describe('When using get', () => {
        it('should return null if not found', async() => {
            const mongodb = require('mongodb');
            const findOne = jest.fn(() => Promise.resolve(null));
            const collection = jest.fn(() => ({findOne}));
            const clientInstance = {
                db: jest.fn(() => ({collection})),
                close: jest.fn()
            };

            mongodb.MongoClient.connect.mockReturnValue(clientInstance);

            const res = await get('sdasd');
            expect(res).toBeNull();
        });

        it('should return an object of product info if exist in DB', async () => {
            const mongodb = require('mongodb');
            const expectRes = { asin: 'asin', name: 'name', dimension: 'dimension', category: 'category', rank:'rank', _id: 'id' }
            const findOne = jest.fn(() => Promise.resolve(expectRes));
            const collection = jest.fn(() => ({findOne}));
            const clientInstance = {
                db: jest.fn(() => ({collection})),
                close: jest.fn()
            };

            mongodb.MongoClient.connect.mockReturnValue(clientInstance);

            const res = await get('asin');
            expect(res).toBe(expectRes);
        });

        it('shoud catch error when error happen', async() => {
            const mongodb = require('mongodb');

            mongodb.MongoClient.connect.mockImplementation(() => Promise.reject(new Error ('error')));
            try {
                const res = await get('sdasd');
            } catch(err) {
                expect(err).toBeTruthy();
            }
        })
    });

    describe('When using create', () => {
        it('should return null if not found', async() => {
            const mongodb = require('mongodb');
            const findOne = jest.fn(() => Promise.resolve(null));
            const collection = jest.fn(() => ({findOne}));
            const clientInstance = {
                db: jest.fn(() => ({collection})),
                close: jest.fn()
            };

            mongodb.MongoClient.connect.mockReturnValue(clientInstance);

            const res = await get('sdasd');
            expect(res).toBeNull();
        });

        it('should be successful created in DB', async () => {
            const mongodb = require('mongodb');
            const insertOne = jest.fn(() => Promise.resolve(true));
            const collection = jest.fn(() => ({insertOne}));
            const clientInstance = {
                db: jest.fn(() => ({collection})),
                close: jest.fn()
            };

            mongodb.MongoClient.connect.mockReturnValue(clientInstance);

            const res = await create({asin: 'asin'});
            expect(res).toBeTruthy();
        });

        it('shoud catch error when error happen', async() => {
            const mongodb = require('mongodb');

            mongodb.MongoClient.connect.mockImplementation(() => Promise.reject(new Error ('error')));
            try {
                const res = await create('sdasd');
            } catch(err) {
                expect(err).toBeTruthy();
            }
        })
    });
})