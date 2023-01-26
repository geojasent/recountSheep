import express from 'express';

const router = express.Router();
const userPost = require('./api/user/postUser');
const dreamEntryPost = require('./api/dream/postDream');
const loginUser = require('./api/login/postLogin');

router.post('/signup', userPost.createUserPost);
router.post('/dreamentry', dreamEntryPost.createDreamEntryPost);
router.post('/login', loginUser.loginUserPost);

export default router;
