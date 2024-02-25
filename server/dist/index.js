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
const app_1 = require("./app");
const config_1 = require("./config/config");
const connection_1 = require("./config/connection");
require("dotenv/config");
const cron_1 = require("./utils/helper/cron");
function checkEnv() {
    const env = [
        "PORT",
        "NODE_ENV",
        "COOKIE_NAME",
        "JWT_SECRET",
        "JWT_EXPIRATION",
        "MONGO_URI",
    ];
    env.forEach((data) => {
        if (!process.env[data]) {
            console.log(`${data} env not found`);
            process.exit(1);
        }
    });
}
const cron = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, cron_1.reloadCoinGeckoDataCron)();
    }
    catch (error) {
        console.log(error);
    }
});
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        checkEnv();
        const port = process.env.PORT;
        try {
            yield (0, connection_1.connection)(config_1.config.MONGO_URI_TESTING);
            cron();
            console.log("Connected to Mongodb");
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
        return app_1.app.listen(config_1.config.PORT, () => {
            console.log("Server listening on PORT ", config_1.config.PORT);
        });
    });
}
initServer();
// initMetricsServer();
