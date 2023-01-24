import express from 'express';

const router = express.Router();
const userPost = require('./api/user/postUser');
const dreamEntryPost = require('./api/dream/postDream');

router.post('/signup', userPost.createUserPost);
router.post('/dreamentry', dreamEntryPost.createDreamEntryPost);

export default router;
