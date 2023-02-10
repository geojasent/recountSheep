import express from 'express';
import getDream from './api/dream/getDream';

const router = express.Router();
const userPost = require('./api/user/postUser');
const dreamEntryPost = require('./api/dream/postDream');
const updateDream = require('./api/dream/putDream');
const deleteDream = require('./api/dream/deleteDream');
const loginUser = require('./api/loginLogout/postLogin');
const logoutUser = require('./api/loginLogout/postLogout');
// const getDream = require('./api/dream/getDream');

router.post('/signup', userPost.createUserPost);
router.post('/dreamentry', dreamEntryPost.createDreamEntryPost);
router.put('/updatedream/:dreamId', updateDream.updateDreamEntryPost);
router.delete('/deletedream/:dreamId', deleteDream.deleteDreamEntryPost);
router.get('/viewdreams', getDream);
router.post('/login', loginUser.loginUserPost);
router.post('/logout', logoutUser.logoutUserPost);

export default router;
