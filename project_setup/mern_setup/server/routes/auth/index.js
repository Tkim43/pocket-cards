const router = require('express').Router();
const { requireSignIn } = require('../../services/passport');
const { signIn, signUp } = require('../../controllers/auth');

router.post('/sign-in', requireSignIn, signIn);

router.post('/sign-up', signUp);

module.exports = router;
