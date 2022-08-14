// external imports
const express = require('express');

// internal imports
const { getLogin } = require('../controllers/loginController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse')

const router = express.Router();

// routes
router.get('/', decorateHtmlResponse("Login"), getLogin);

module.exports = router;