jest.mock('../../services/data_access');
jest.mock('../../services/product_scraper');
const data = require('../../services/data_access');
const productScraper = require('../../services/product_scraper'); 

const {getProductInfo} = require('../../services');
describe('When using getProductInfo', () => {
    it('should return product from DB if it exist in DB', async() => {
        const res = { asin: 'asin', name: 'name', dimension: 'dimension', category: 'category', rank:'rank' }
        data.get.mockResolvedValue(res);

        const product = await getProductInfo('asin');
        expect(data.get).toHaveBeenCalled();
        expect(data.create).not.toHaveBeenCalled();
        expect(product).toBe(res);
    });

    it('should return product from amazon if not exist in DB', async() => {
        const res = { asin: 'asin', name: 'name', dimension: 'dimension', category: 'category', rank:'rank' }
        data.get.mockResolvedValue(null);
        data.create.mockResolvedValue(true);
        productScraper.getProductInfoFromAmazon.mockResolvedValue (res);
        const product = await getProductInfo('asin');
        expect(data.get).toHaveBeenCalled();
        // expect(data.create).toHaveBeenCalled();
        expect(product).toBe(res);
    });

    it('should return null if ASIN is not given', async () => {
        ['', null, undefined].forEach(async(asin) => {
            const res = await getProductInfo(asin);
            expect(res).toBeUndefined();
        });
    });

})