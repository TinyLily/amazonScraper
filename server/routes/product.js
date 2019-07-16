const express = require('express');
const router = express.Router();
const { getProductInfoFromAmazon } = require('../services/product_scraper');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const product = await getProductInfoFromAmazon('B003N9M6YI');
    res.json(product);
});

module.exports = router;
