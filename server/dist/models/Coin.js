"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    id: {
        type: String,
    },
    symbol: {
        type: String,
    },
    name: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Coin = mongoose_1.default.model("Coin", Schema);
