// external import
const router = require('express').Router();

// internal imports
const { getInbox } = require('../controllers/inboxController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse');
const { isLoggedIn } = require('../middlewares/commons/isLoggedIn')

// routes
router.get('/', decorateHtmlResponse("Inbox"), isLoggedIn, getInbox);

module.exports = router;