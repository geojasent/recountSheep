"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../dbConnection"));
function getDream(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //TODO implement query with date range and search
            const sessionId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id;
            //if get request is search do a different query
            const storedDreams = yield dbConnection_1.default.query(`SELECT day_of_month, day_of_week, time_to_bed, time_awake, people, dream_location, type_of_dream, dream_description FROM dreamentry WHERE user_id = ${sessionId}`);
            res.send(storedDreams.rows);
        }
        catch (err) {
            console.log(err);
            //res no dreams to display
        }
    });
}
exports.default = getDream;
