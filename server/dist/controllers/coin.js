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
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinController = void 0;
const coin_gecko_1 = require("../services/lib/coin_gecko");
class CoinController {
    constructor() {
        this.RelativePrice = this.RelativePrice.bind(this);
    }
    getDaysElapsed(date) {
        const today = new Date();
        const providedDate = new Date(date);
        const elapsedDays = Math.floor((today.getTime() - providedDate.getTime()) / (24 * 60 * 60 * 1000));
        return elapsedDays;
    }
    exchangeRate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { coin1, coin2 } = req.params;
                const data = yield coin_gecko_1.coinGecko.coinsMaketData(`${coin1},${coin2}`);
                const exchangeRate = data[0].current_price / data[1].current_price;
                res.status(200).json({
                    data: exchangeRate,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    RelativePrice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fromCurrency, toCurrency, date } = req.body;
                // const timestamp = this.getTimestampFromDate(new Date(date));
                const elapsedDays = this.getDaysElapsed(date);
                const fromCurPromise = coin_gecko_1.coinGecko.getHistoricalData(fromCurrency, elapsedDays.toString());
                const toCurPromise = coin_gecko_1.coinGecko.getHistoricalData(toCurrency, elapsedDays.toString());
                const [fromCur, toCur] = yield Promise.all([
                    fromCurPromise,
                    toCurPromise,
                ]);
                const val = fromCur.prices[0][1] / toCur.prices[0][1];
                return res.status(200).json({
                    data: val,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    currencyHoldings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { coinId } = req.params;
                console.log("Params", coinId);
                const data = yield coin_gecko_1.coinGecko.currencyHoldingComapnies(coinId);
                res.status(200).json({
                    data: "data?.companies",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.coinController = new CoinController();
