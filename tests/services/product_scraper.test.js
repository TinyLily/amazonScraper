jest.mock('../../services/data_access');
jest.mock('axios')

const { getProductInfoFromAmazon, getProductInfo } = require('../../services/product_scraper');

const data = require('../../services/data_access');

const axios = require('axios');

describe('Test for  product_scraper', () => {
    describe('When using getProductInfoFromAmazon', () => {
        it.skip('should return product object when success', async () => {
            const res = { asin: 'asin', name: 'name', dimension: 'dimension', category: 'category', rank:'rank' }
            axios.get.mockResolvedValue({
                data: res
            });
            const product = await getProductInfoFromAmazon('asin');
            expect(product).toBe(res);

        });

        
        it('should return null if the ASIN given is not exist', async () => {
            axios.get.mockImplementationOnce(() =>
                Promise.rejct(new Error('Request failed with status code 404'))
            );
            const product = await getProductInfoFromAmazon('asin');
            expect(product).toBeNull();

        });
    });

    describe('When using getProductInfo', () => {
        it('should return product from DB if it exist in DB', async() => {
            const res = { asin: 'asin', name: 'name', dimension: 'dimension', category: 'category', rank:'rank' }
            data.get.mockResolvedValue(res);

            const product = await getProductInfo('asin');
            expect(product).toBe(res);
        });

        it('should return null if ASIN is not given', async () => {
            ['', null, undefined].forEach((asin) => {
                const res = getProductInfo(asin);
                expect(res).toBeNull();
            });
        });

    })
});