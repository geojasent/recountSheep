"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getDream_1 = __importDefault(require("./api/dream/getDream"));
const router = express_1.default.Router();
const userPost = require('./api/user/postUser');
const dreamEntryPost = require('./api/dream/postDream');
const loginUser = require('./api/loginLogout/postLogin');
const logoutUser = require('./api/loginLogout/postLogout');
// const getDream = require('./api/dream/getDream');
router.post('/signup', userPost.createUserPost);
router.post('/dreamentry', dreamEntryPost.createDreamEntryPost);
router.get('/viewdreams', getDream_1.default);
router.post('/login', loginUser.loginUserPost);
router.post('/logout', logoutUser.logoutUserPost);
exports.default = router;
