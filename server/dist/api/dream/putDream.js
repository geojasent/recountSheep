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
exports.updateDreamEntryPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id;
        const dreamId = req.params.dreamId;
        const { date, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription } = req.body;
        const updateDream = yield dbConnection_1.default.query(`UPDATE dreamentry SET user_id = $1, day_of_month = $2, day_of_week = $3, time_to_bed = $4, time_awake = $5, people = $6, dream_location = $7, type_of_dream = $8, dream_description = $9 WHERE user_id = ${userId} AND dream_id = ${dreamId} RETURNING *`, [userId, date, dayOfWeek, timeToBed, timeAwake, people, dreamLocation, typeOfDream, dreamDescription]);
        res.json(updateDream.rowCount);
    }
    catch (err) {
        console.log(err);
    }
});
