// external import
const router = require('express').Router();

// internal imports
const { getInbox } = require('../controllers/inboxController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse');

// routes
router.get('/', decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;