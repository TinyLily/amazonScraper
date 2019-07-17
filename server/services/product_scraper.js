const axios = require('axios');
const htmlparser = require("htmlparser2");
const cheerio = require('cheerio');

const SELECTOR = {
    TITLE: '#productTitle',
    SALESRANK: '#SalesRank',
    PRODUCTDIM: [
        '#prodDetails > div.wrapper.USlocale > div.column.col1 > div > div.content.pdClearfix > div > div > table > tbody > tr:nth-child(2) > td.value',
        '#detail-bullets > table'
    ]
};

const getProductInfoFromAmazon = async (asin) => {
    try {
        const amazonData = await axios.get(`https://www.amazon.com/dp/${asin}`);  

        const dom = htmlparser.parseDOM(amazonData.data);
        const $ = cheerio.load(dom);

        // get product name
        const name = $(SELECTOR.TITLE).text().match(/\w[A-Za-z0-9_ !@#$%^&*;'/]+/g)[0];

        //get rank and category
        const text = $(SELECTOR.SALESRANK).text();
        const regex = /#[A-Za-z0-9_, $%&@]+ \(/g;
        let rank, category;
        if(!text) {
            rank = 'NOT FOUND';
            category = 'NOT FOUND';
        } else {
            const salesRank = text.match(regex)[0].split('(')[0].split('in');
            const rank = salesRank[0] || 'a';
            const category = salesRank[1] || 'b';
        }
        
        //get dimensions
        let dimensions = $(SELECTOR.PRODUCTDIM[0]).text();

        if (!dimensions) {
            let regex = /Product Dimensions:( ||\n)+[A-Za-z0-9_, $.%&@]+ inches/g;
            const dimRegex = /\d[0-9.x ]+ inches/g;
            if(!dimensions) {
                dimensions= 'NOT FOUND'
            } else {
                dimensions = $(SELECTOR.PRODUCTDIM[1]).text().match(regex)[0].match(dimRegex)[0];
            }
        }
        
        const productInfo = {name,asin,rank,category,dimensions};
        return productInfo;
    } catch (err) {
        if(err.message === 'Request failed with status code 404') {
            console.log('Product NOT FOUND in amazon!');
        }
        return;
    }
};

module.exports = {
    getProductInfoFromAmazon
}