const express = require('express');
const router = express.Router();
const { getProductInfo } = require('../services');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    console.log(req.query);
    const {asin} = req.query;
    const product = await getProductInfo(asin);
    res.json(product);
});

module.exports = router;
