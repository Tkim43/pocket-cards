const router = require('express').Router();
const { requireAuth, requireSignIn } = require('../../services/passport');
const { signIn, signUp } = require('../../controllers/auth');

router.get('/sign-in', requireAuth, signIn);
router.post('/sign-in', requireSignIn, signIn);

router.post('/sign-up', signUp);

module.exports = router;
