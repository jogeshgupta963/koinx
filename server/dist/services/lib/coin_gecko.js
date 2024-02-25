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
exports.coinGecko = void 0;
const axios_1 = __importDefault(require("axios"));
const Coin_1 = require("../../models/Coin");
class CoinGecko {
    constructor() {
        this.url = "https://api.coingecko.com/api/v3";
        this.listCoins = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.apiCaller("/coins/list", { method: "GET" });
                console.log(data[0]);
                yield Coin_1.Coin.deleteMany({});
                yield Coin_1.Coin.insertMany(data);
                return data;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
        this.coinsMaketData = (ids) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(ids);
                return yield this.apiCaller(`/coins/markets?vs_currency=usd&ids=${ids}`, {
                    method: "GET",
                });
            }
            catch (err) {
                // console.log(err);
                throw err;
            }
        });
        this.getHistoricalData = (fromCurrency, days) => __awaiter(this, void 0, void 0, function* () {
            try {
                const historicalPricesUrl = this.apiCaller(`/coins/${fromCurrency}/market_chart?vs_currency=usd&days=${days}&interval=daily`, {
                    method: "GET",
                });
                return historicalPricesUrl;
            }
            catch (err) {
                throw err;
            }
        });
        this.currencyHoldingComapnies = (coin) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.apiCaller(`/companies/public_treasury/${coin}`, {
                    method: "GET",
                });
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    apiCaller(route, options = {
        data: {},
        method: "GET",
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.url + route, options);
                const { data } = yield (0, axios_1.default)(Object.assign(Object.assign({ url: this.url + route }, options), { headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    } }));
                console.log(data);
                return data;
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
                throw err;
            }
        });
    }
}
exports.coinGecko = new CoinGecko();
