// external import
const router = require('express').Router();

// internal imports
const { getUser, addUser, removeUser, getSignup, postSignup } = require('../controllers/usersController');
const decorateHtmlResponse = require('../middlewares/commons/decorateHtmlResponse');
const { isLoggedIn, isLogout } = require('../middlewares/commons/isLoggedIn')
const avatarUpload = require('../middlewares/user/avatarUpload');
const { userValidators, userValidatorsHandler } = require('../middlewares/user/userValidator')

// routes
// users routers controlled by user
router.get('/signup', decorateHtmlResponse("Signup"), isLogout, getSignup);
router.post('/signup', decorateHtmlResponse("Signup"), isLogout, avatarUpload, userValidators, userValidatorsHandler, postSignup);

// users routers controlled by admin
router.get('/', decorateHtmlResponse("Users"), isLoggedIn, getUser);
router.post('/', isLoggedIn, avatarUpload, userValidators, userValidatorsHandler, addUser);
router.delete('/:id', removeUser);

module.exports = router;