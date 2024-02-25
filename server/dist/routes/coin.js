"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const coin_1 = require("../controllers/coin");
exports.router = express_1.default.Router();
exports.router.route("/exchangeRate/:coin1/:coin2").get(coin_1.coinController.exchangeRate);
exports.router.route("/value").post(coin_1.coinController.RelativePrice);
exports.router.route("/company/holdings/:coinId").get(coin_1.coinController.currencyHoldings);
