// external import
const router = require('express').Router();

// internal imports
const { getUser } = require('../controllers/usersController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse');

// routes
router.get('/', decorateHtmlResponse("Users"), getUser);

module.exports = router;