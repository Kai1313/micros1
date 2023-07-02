const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/api/show', apiController.getDataFromAPI);
router.get('/api/getJson', apiController.getJsonFromAPI);
router.get('/api/prepare', apiController.getJsonPrepareFromAPI);

module.exports = router;
