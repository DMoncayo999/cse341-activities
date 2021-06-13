//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const ta03Controller = require('../controller/ta03');



const ITEMS_PER_PAGE = 10 // Limit of 10 items per page.


router.get('/',ta03Controller.getItems);


module.exports = router;
