"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express_1.default.json());
app.use('/', router_1.default);
// //get homepage
// app.get('/', (req: Request, res: Response) => {
//     res.send('Express + TypeScript Server');
// });
// //get dreams
// app.get('/viewdreams', (req: Request, res: Response) => {
//     res.send('View submmitted dreams');
// });
// //update dream
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
//on shutdown pool end??
