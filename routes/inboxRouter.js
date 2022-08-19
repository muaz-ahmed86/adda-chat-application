// external import
const router = require('express').Router();

// internal imports
const { getInbox, searchUsers, addConversation } = require('../controllers/inboxController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse');
const { isLoggedIn } = require('../middlewares/commons/isLoggedIn')

// routes
router.get('/', decorateHtmlResponse("Inbox"), isLoggedIn, getInbox);

router.post('/search', isLoggedIn, searchUsers);
router.post('/conversation', isLoggedIn, addConversation);

module.exports = router;