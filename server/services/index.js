const {getProductInfoFromAmazon} = require('./product_scraper');
const {get, create} = require('./data_access');

const getProductInfo = async (asin) => {
    if(!asin) {
        return;
    }
    try {
        const productInfoFromDB = await get(asin);
        if(!productInfoFromDB) {
            const productInfoFromAMZ = await getProductInfoFromAmazon(asin);
            console.log(getProductInfoFromAmazon);
            console.log('@@@@@', asin,productInfoFromAMZ);
            if(productInfoFromAMZ) {
                const result = await create(productInfoFromAMZ);
                // console.log(result);
            }   
            return  productInfoFromAMZ;  
        }
        return productInfoFromDB;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getProductInfo
};