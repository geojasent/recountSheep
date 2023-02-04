import express from 'express';
import getDream from './api/dream/getDream';

const router = express.Router();
const userPost = require('./api/user/postUser');
const dreamEntryPost = require('./api/dream/postDream');
const deleteDream = require('./api/dream/deleteDream');
const loginUser = require('./api/loginLogout/postLogin');
const logoutUser = require('./api/loginLogout/postLogout');
// const getDream = require('./api/dream/getDream');

router.post('/signup', userPost.createUserPost);
router.post('/dreamentry', dreamEntryPost.createDreamEntryPost);
router.delete('/deletedream/:dreamId', deleteDream.deleteDream);
router.get('/viewdreams', getDream);
router.post('/login', loginUser.loginUserPost);
router.post('/logout', logoutUser.logoutUserPost);

export default router;
