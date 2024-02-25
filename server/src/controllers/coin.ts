import { NextFunction, Response, Request } from "express";
import { Coin } from "../models/Coin";
import { coinGecko } from "../services/lib/coin_gecko";

class CoinController {
    constructor() {
        this.RelativePrice = this.RelativePrice.bind(this);
    }
    private getDaysElapsed(date: string): number {
        const today = new Date();
        const providedDate = new Date(date);
        const elapsedDays = Math.floor(
            (today.getTime() - providedDate.getTime()) / (24 * 60 * 60 * 1000)
        );
        return elapsedDays;
    }

    public async exchangeRate(req: Request, res: Response, next: NextFunction) {
        try {
            const { coin1, coin2 } = req.params;

            const data = await coinGecko.coinsMaketData(`${coin1},${coin2}`);
            const exchangeRate = data[0].current_price / data[1].current_price;
            res.status(200).json({
                data: exchangeRate,
            });
        } catch (err) {
            next(err);
        }
    }
    public async RelativePrice(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { fromCurrency, toCurrency, date } = req.body;

            // const timestamp = this.getTimestampFromDate(new Date(date));
            const elapsedDays = this.getDaysElapsed(date);

            const fromCurPromise = coinGecko.getHistoricalData(
                fromCurrency,
                elapsedDays.toString()
            );
            const toCurPromise = coinGecko.getHistoricalData(
                toCurrency,
                elapsedDays.toString()
            );
            const [fromCur, toCur] = await Promise.all([
                fromCurPromise,
                toCurPromise,
            ]);
            const val = fromCur.prices[0][1] / toCur.prices[0][1];
            return res.status(200).json({
                data: val,
            });
        } catch (err) {
            next(err);
        }
    }
    public async currencyHoldings(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { coinId } = req.params;
            console.log("Params", coinId);
            const data = await coinGecko.currencyHoldingComapnies(coinId);
            res.status(200).json({
                data: data?.companies,
            });
        } catch (err) {
            next(err);
        }
    }
}

export const coinController = new CoinController();
