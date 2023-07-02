const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/api/show', apiController.getDataFromAPI);
router.get('/api/getJson', apiController.getJsonFromAPI);
router.get('/api/prepare', apiController.getJsonPrepareFromAPI);
router.get('/api/getInner', apiController.fetchAllInnerData);
router.get('/api/getPrinted', apiController.fetchAllPrintedData);
router.post('/api/csvCreate', apiController.createCsvPrint);

module.exports = router;
