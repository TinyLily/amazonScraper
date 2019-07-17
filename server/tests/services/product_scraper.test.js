
jest.mock('axios')
const axios = require('axios');

const fs = require('fs'); 
const data = require('../../services/data_access');

//Test target
const { getProductInfoFromAmazon } = require('../../services/product_scraper');

// const mockData = fs.readFile('../mocks/mock.html', 'utf8');
const mockData = fs.readFileSync('./tests/mocks/mock.html', 'utf8');
const mockData2 = fs.readFileSync('./tests/mocks/mock2.html', 'utf8');

describe('Test for  product_scraper', () => {
    describe('When using getProductInfoFromAmazon', () => {
        it('should return product object when success', async () => {
            const res = { asin: 'asin', name: 'Nuby Ice Gel Teether Keys', dimensions: '1.5 x 6.5 x 4.1 inches', category: ' Baby ', rank:'#5 ' }
            axios.get.mockResolvedValue({
                data: mockData
            });
            const product = await getProductInfoFromAmazon('asin');
            expect(product).toStrictEqual(res);

        });

        it('should return product object when success', async () => {
            const res = { asin: 'asin', name: 'AmazonBasics Powder Free Disposable Nitrile Gloves', dimensions: '12.4 x 10.2 x 9.8 inches', category: ' Industrial & Scientific ', rank:'#468,068 ' }
            axios.get.mockResolvedValue({
                data: mockData2
            });
            const product = await getProductInfoFromAmazon('asin');
            expect(product).toStrictEqual(res);

        });

        
        it('should return null if the ASIN given is not exist', async () => {
            axios.get.mockImplementationOnce(() =>
                Promise.rejct(new Error('Request failed with status code 404'))
            );
            const product = await getProductInfoFromAmazon('asin');
            expect(product).toBeUndefined();

        });
    });
});