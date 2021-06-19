const express = require('express');
const router = express.Router();
const pr09Controller = require('../controller/pr09');


const ITEMS_PER_PAGE = 10 // Limit of 10 items per page.

router.get('/',pr09Controller.getItems);

module.exports = router;
