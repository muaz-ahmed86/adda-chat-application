// external import
const router = require('express').Router();

// internal imports
const { getInbox, searchUsers, addConversation, getMessages, sendMessage } = require('../controllers/inboxController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse');
const { isLoggedIn } = require('../middlewares/commons/isLoggedIn');
const attachmentUploader = require('../middlewares/inbox/attachmentUploader')

// routes
router.get('/', decorateHtmlResponse("Inbox"), isLoggedIn, getInbox);

router.post('/search', isLoggedIn, searchUsers);
router.post('/conversation', isLoggedIn, addConversation);

router.get('/messages/:conversation_id', isLoggedIn, getMessages);

router.post('/message', isLoggedIn, attachmentUploader, sendMessage);

module.exports = router;